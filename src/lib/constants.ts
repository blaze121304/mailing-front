/** 구독 폼에서 선택 가능한 뉴스 카테고리 */
export const NEWS_CATEGORIES = [
  { id: 'politics', code: 'POLITICS', label: '정치' },
  { id: 'economy', code: 'ECONOMY', label: '경제' },
  { id: 'culture', code: 'CULTURE', label: '문화' },
  { id: 'society', code: 'SOCIETY', label: '사회' },
  { id: 'tech', code: 'IT', label: '기술' },
] as const

export type CategoryId = (typeof NEWS_CATEGORIES)[number]['id']
export type CategoryCode = (typeof NEWS_CATEGORIES)[number]['code']
