'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Redirect
 */
const Redirect = (): void => {
  const params = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    void fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: params.get('code'),
      }),
    })
    router.push('/')
  }, [params, router])
}
export default Redirect
