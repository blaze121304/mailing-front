/** 구독 API 요청 (POST /api/subscribe) */
export interface SubscribeRequest {
  email: string
  categories: string[]
}

/** 공통 에러 응답 (400 등) */
export interface ErrorResponse {
  message?: string
  [key: string]: unknown
}
