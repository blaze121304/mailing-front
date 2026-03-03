import { useState, useCallback } from 'react'
import { subscribe, getErrorMessage } from '../lib/api'
import type { SubscribeRequest } from '../lib/types'
import { NEWS_CATEGORIES } from '../lib/constants'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
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
    [email, selectedCategories]
  )

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360, margin: '0 auto' }}>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(null)
          }}
          placeholder="example@email.com"
          disabled={loading}
          autoComplete="email"
          style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ display: 'block', marginBottom: 8 }}>관심 카테고리 (복수 선택)</span>
        {NEWS_CATEGORIES.map((cat) => (
          <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.id)}
              onChange={() => toggleCategory(cat.id)}
              disabled={loading}
            />
            {cat.label}
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" style={{ color: '#c00', marginBottom: 12, fontSize: 14 }}>
          {error}
        </p>
      )}
      <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
        {loading ? '처리 중...' : '구독하기'}
      </button>
    </form>
  )
}
