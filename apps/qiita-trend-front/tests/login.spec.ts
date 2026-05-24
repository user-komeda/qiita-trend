/* eslint-disable max-lines */
import { test, expect } from '@playwright/test'

// eslint-disable-next-line max-lines-per-function
test.describe('Login flow', () => {
  // eslint-disable-next-line max-lines-per-function
  test('should redirect to Qiita login page and set oauth state cookie', async ({
    page,
    context,
  }) => {
    await page.goto('http://localhost:3000')

    await page.getByRole('link', { name: 'Login' }).click()

    await expect(page).toHaveURL(/https:\/\/qiita\.com\/login\?redirect_to=/, {
      timeout: 30000,
    })

    const url = new URL(page.url())
    const authorizationUrl = new URL(
      url.searchParams.get('redirect_to') ?? '',
      url.origin,
    )

    expect(url.origin).toBe('https://qiita.com')
    expect(url.pathname).toBe('/login')
    expect(authorizationUrl.pathname).toBe('/api/v2/oauth/authorize')
    expect(authorizationUrl.searchParams.get('client_id')).not.toBeNull()
    expect(authorizationUrl.searchParams.get('scope')).toBe(
      'read_qiita write_qiita',
    )
    expect(authorizationUrl.searchParams.get('redirect_uri')).toBe(
      'http://localhost:3000/api/login/redirect',
    )
    expect(authorizationUrl.searchParams.get('state')).not.toBeNull()

    const cookies = await context.cookies('http://localhost:3000')
    const oauthStateCookie = cookies.find((cookie) => {
      return cookie.name === 'oauth_state'
    })

    expect(oauthStateCookie).toBeDefined()
    expect(oauthStateCookie?.value).toBe(
      authorizationUrl.searchParams.get('state'),
    )
    expect(oauthStateCookie?.httpOnly).toBe(true)
    expect(oauthStateCookie?.sameSite).toBe('Lax')
  })

  test('should redirect to denied when Qiita authorization is denied', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: 'oauth_state',
        value: 'test-state',
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        sameSite: 'Lax',
      },
    ])

    await page.goto(
      'http://localhost:3000/api/login/redirect?error=access_denied&state=test-state',
    )

    await expect(page).toHaveURL('http://localhost:3000/?login=denied')

    const cookies = await context.cookies('http://localhost:3000')
    const oauthStateCookie = cookies.find((cookie) => {
      return cookie.name === 'oauth_state'
    })

    expect(oauthStateCookie).toBeUndefined()
  })

  test('should redirect to invalid_state when callback state does not match cookie', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: 'oauth_state',
        value: 'expected-state',
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        sameSite: 'Lax',
      },
    ])

    await page.goto(
      'http://localhost:3000/api/login/redirect?code=test-code&state=wrong-state',
    )

    await expect(page).toHaveURL('http://localhost:3000/?login=invalid_state')

    const cookies = await context.cookies('http://localhost:3000')
    const oauthStateCookie = cookies.find((cookie) => {
      return cookie.name === 'oauth_state'
    })

    expect(oauthStateCookie).toBeUndefined()
  })

  test('should redirect to invalid_request when code is missing', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: 'oauth_state',
        value: 'test-state',
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        sameSite: 'Lax',
      },
    ])

    await page.goto('http://localhost:3000/api/login/redirect?state=test-state')

    await expect(page).toHaveURL('http://localhost:3000/?login=invalid_request')

    const cookies = await context.cookies('http://localhost:3000')
    const oauthStateCookie = cookies.find((cookie) => {
      return cookie.name === 'oauth_state'
    })

    expect(oauthStateCookie).toBeUndefined()
  })
})
