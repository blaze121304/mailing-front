/** 구독 API 요청 (POST /api/subscribe) */
export interface SubscribeRequest {
  email: string
  /** "하" / "중" / "상" */
  difficulty: '하' | '중' | '상'
  categories: string[]
}

/** 공통 에러 응답 (400 등) */
export interface ErrorResponse {
  message?: string
  [key: string]: unknown
}
