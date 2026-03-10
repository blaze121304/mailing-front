/** 구독 폼에서 선택 가능한 뉴스 카테고리
 *  백엔드 허용값: 사회, 경제, 정치, IT&기술, 문화
 */
export const NEWS_CATEGORIES = [
  { id: 'society', code: '사회', label: '사회' },
  { id: 'economy', code: '경제', label: '경제' },
  { id: 'politics', code: '정치', label: '정치' },
  { id: 'it', code: 'IT&기술', label: 'IT & 기술' },
  { id: 'culture', code: '문화', label: '문화' },
] as const

export type CategoryId = (typeof NEWS_CATEGORIES)[number]['id']
export type CategoryCode = (typeof NEWS_CATEGORIES)[number]['code']
