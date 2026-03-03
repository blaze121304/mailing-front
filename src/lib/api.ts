import axios, { type AxiosError } from 'axios'
import type { SubscribeRequest, ErrorResponse } from './types'

// 백엔드 실제 엔드포인트: http://localhost:8080/api/subscribers
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

/** 구독 신청 */
export async function subscribe(data: SubscribeRequest): Promise<void> {
  await api.post('/api/subscribers', data)
}

/** API 에러 메시지 추출 (400: 백엔드 메시지, 기타/네트워크: 공통 메시지) */
export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const e = err as AxiosError<ErrorResponse>
    if (e.response?.status === 400 && e.response?.data?.message) {
      return e.response.data.message
    }
    if (e.code === 'ECONNABORTED' || e.message?.includes('Network')) {
      return '서버와의 연결이 원활하지 않습니다'
    }
    return '서버와의 연결이 원활하지 않습니다'
  }
  return '서버와의 연결이 원활하지 않습니다'
}
