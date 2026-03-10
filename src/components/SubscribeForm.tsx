import { useState, useCallback } from 'react'
import { subscribe, sendSampleNewsletter, getErrorMessage } from '../lib/api'
import type { SubscribeRequest } from '../lib/types'
import { NEWS_CATEGORIES } from '../lib/constants'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<'하' | '중' | '상'>('중')
  const [loading, setLoading] = useState(false)
  const [sampleLoading, setSampleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleCategory = useCallback((id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
    setError(null)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)

      const emailTrimmed = email.trim()
      if (!EMAIL_REGEX.test(emailTrimmed)) {
        setError('올바른 이메일 형식을 입력해 주세요.')
        return
      }
      if (selectedCategories.length === 0) {
        setError('관심 카테고리를 최소 1개 이상 선택해 주세요.')
        return
      }

      setLoading(true)
      try {
        const payloadCategories = NEWS_CATEGORIES.filter((cat) =>
          selectedCategories.includes(cat.id)
        ).map((cat) => cat.code)

        const payload: SubscribeRequest = {
          email: emailTrimmed,
          difficulty,
          categories: payloadCategories,
        }

        await subscribe(payload)
        alert('구독이 완료되었습니다')
        setEmail('')
        setSelectedCategories([])
      } catch (err) {
        const message = getErrorMessage(err)
        setError(message)
        alert(message)
      } finally {
        setLoading(false)
      }
    },
    [email, selectedCategories, difficulty]
  )

  const handleSampleClick = useCallback(async () => {
    setError(null)

    const emailTrimmed = email.trim()
    if (!EMAIL_REGEX.test(emailTrimmed)) {
      setError('올바른 이메일 형식을 입력해 주세요.')
      return
    }
    if (selectedCategories.length === 0) {
      setError('관심 카테고리를 최소 1개 이상 선택해 주세요.')
      return
    }

    const payloadCategories = NEWS_CATEGORIES.filter((cat) =>
      selectedCategories.includes(cat.id)
    ).map((cat) => cat.code)

    const payload: SubscribeRequest = {
      email: emailTrimmed,
      difficulty,
      categories: payloadCategories,
    }

    setSampleLoading(true)
    try {
      await sendSampleNewsletter(payload)
      alert('샘플 뉴스레터 발송을 요청했습니다.')
    } catch (err) {
      const message = getErrorMessage(err)
      setError(message)
      alert(message)
    } finally {
      setSampleLoading(false)
    }
  }, [email, selectedCategories, difficulty])

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360, margin: '0 auto' }}>
      <div className="form-group">
        <label htmlFor="email" className="label">
          이메일
        </label>
        <input
          id="email"
          type="email"
          className="input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(null)
          }}
          placeholder="you@example.com"
          disabled={loading || sampleLoading}
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <span className="label">난이도</span>
        <div style={{ display: 'flex', gap: 12 }}>
          {(['하', '중', '상'] as const).map((level) => (
            <label key={level} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14 }}>
              <input
                type="radio"
                name="difficulty"
                value={level}
                checked={difficulty === level}
                onChange={() => setDifficulty(level)}
                disabled={loading || sampleLoading}
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <div className="categories-label-row">
          <span className="label">관심 카테고리</span>
          <span className="categories-hint">복수 선택 가능</span>
        </div>
        <div className="categories-grid">
          {NEWS_CATEGORIES.map((cat) => (
            <label key={cat.id} className="category-pill">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                disabled={loading || sampleLoading}
              />
              {cat.label}
            </label>
          ))}
        </div>
      </div>

      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button type="submit" disabled={loading || sampleLoading} className="submit-button">
          {loading ? '처리 중...' : '구독하기'}
        </button>
        <button
          type="button"
          disabled={loading || sampleLoading}
          className="secondary-button"
          onClick={handleSampleClick}
        >
          {sampleLoading ? '샘플 발송 중...' : '샘플 받아보기'}
        </button>
      </div>
    </form>
  )
}
