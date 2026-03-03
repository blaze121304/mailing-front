import { SubscribeForm } from '../components/SubscribeForm'

export function SubscribePage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>뉴스 구독 신청</h1>
      <p style={{ marginBottom: 24 }}>이메일과 관심 카테고리를 선택한 뒤 구독하기를 눌러 주세요.</p>
      <SubscribeForm />
    </div>
  )
}
