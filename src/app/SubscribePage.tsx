import { SubscribeForm } from '../components/SubscribeForm'

export function SubscribePage() {
  return (
    <div className="layout">
      <header className="hero">
        <div className="hero-left">
          <p className="hero-badge">AI 뉴스레터</p>
          <h1 className="hero-title">
            오늘의 뉴스를
            <br />
            한 번에 요약해서 받아보세요
          </h1>
          <p className="hero-subtitle">
            사회 · 경제 · 정치 · IT&기술 · 문화까지,
            <br />
            Gemini AI가 핵심만 뽑아 매일 이메일로 보내드립니다.
          </p>
          <ul className="hero-bullets">
            <li>하루 한 번, 5분 안에 읽을 수 있는 분량</li>
            <li>관심 카테고리와 난이도를 직접 선택하는 맞춤형 구독</li>
            <li>매일 아침 9시에 자동 발송</li>
            <li>불필요한 광고 없이 뉴스만 깔끔하게</li>
          </ul>
        </div>

        <div className="hero-right card">
          <h2 className="hero-form-title">지금 구독 시작하기</h2>
          <p className="hero-form-subtitle">이메일과 관심 카테고리를 선택해 주세요.</p>
          <SubscribeForm />
        </div>
      </header>

      <section className="benefits">
        <h3 className="section-title">어떤 뉴스를 받게 되나요?</h3>
        <div className="benefits-grid">
          <article className="benefit-card">
            <h4>사회</h4>
            <p>일상과 가장 가까운 이슈를 쉽게 풀어서 전달합니다.</p>
          </article>
          <article className="benefit-card">
            <h4>경제</h4>
            <p>환율 · 금리 · 주식 등 꼭 알아야 할 흐름만 요약합니다.</p>
          </article>
          <article className="benefit-card">
            <h4>정치</h4>
            <p>복잡한 정치 뉴스를 한눈에 보이도록 정리해 드립니다.</p>
          </article>
          <article className="benefit-card">
            <h4>IT&기술</h4>
            <p>새로운 기술 트렌드와 서비스 소식을 빠르게 전합니다.</p>
          </article>
          <article className="benefit-card">
            <h4>문화</h4>
            <p>콘텐츠 · 라이프스타일 등 놓치기 쉬운 이야기들을 담았습니다.</p>
          </article>
        </div>
      </section>

      <section className="steps">
        <h3 className="section-title">뉴스레터는 이렇게 발송돼요</h3>
        <ol className="steps-list">
          <li className="step-item">
            <span className="step-badge">1</span>
            <div>
              <p className="step-title">하루치 뉴스를 수집</p>
              <p className="step-desc">주요 매체에서 오늘 꼭 알아야 할 기사들을 모읍니다.</p>
            </div>
          </li>
          <li className="step-item">
            <span className="step-badge">2</span>
            <div>
              <p className="step-title">Gemini AI가 요약</p>
              <p className="step-desc">5개 카테고리 × 3단계 난이도로 내용을 정리합니다.</p>
            </div>
          </li>
          <li className="step-item">
            <span className="step-badge">3</span>
            <div>
              <p className="step-title">이메일로 발송</p>
              <p className="step-desc">설정한 카테고리에 맞춰 깔끔한 뉴스레터를 보내드립니다.</p>
            </div>
          </li>
        </ol>
      </section>
    </div>
  )
}

