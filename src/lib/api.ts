import axios, { type AxiosError } from 'axios'
import type { SubscribeRequest, ErrorResponse } from './types'

// 개발 환경에서는 Vite 프록시(10005 -> 10004)를 타도록 상대 경로 사용
// 실제 호출 URL: http://localhost:10005/api/... (프론트) → 프록시 → http://localhost:10004/api/... (백엔드)
const api = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

/** 구독 신청 */
export async function subscribe(data: SubscribeRequest): Promise<void> {
  await api.post('/api/subscribe', data)
}

/** 샘플 뉴스레터 발송 (테스트용) - 구독 요청과 동일한 body 필요 */
export async function sendSampleNewsletter(data: SubscribeRequest): Promise<void> {
  await api.post('/api/sample-newsletter', data)
}

/** API 에러 메시지 추출 (400: 백엔드 메시지, 기타/네트워크: 공통 메시지) */
export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const e = err as AxiosError<ErrorResponse | string>

    // 400 Bad Request 는 백엔드 에러 메시지를 그대로 노출
    if (e.response?.status === 400) {
      const data = e.response.data

      if (typeof data === 'string' && data.trim().length > 0) {
        return data
      }

      if (
        data &&
        typeof data === 'object' &&
        'message' in data &&
        typeof (data as any).message === 'string'
      ) {
        return (data as any).message as string
      }

      return '요청이 올바르지 않습니다.'
    }

    // 네트워크/타임아웃 계열
    if (e.code === 'ECONNABORTED' || e.message?.includes('Network')) {
      return '서버와의 연결이 원활하지 않습니다'
    }

    // 그 외 상태코드
    return '서버와의 연결이 원활하지 않습니다'
  }

  return '서버와의 연결이 원활하지 않습니다'
}
