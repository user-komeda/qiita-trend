import { test, expect, type Locator, type Page } from '@playwright/test'

const approveQiitaAuthorizationIfNeeded = async (page: Page) => {
  const approveLocators: Locator[] = [
    page.getByRole('button', { name: /許可|承認|Authorize|Allow/i }),
    page.getByRole('link', { name: /許可|承認|Authorize|Allow/i }),
    page.locator('button[type="submit"]'),
    page.locator('input[type="submit"]'),
  ]

  for (const locator of approveLocators) {
    try {
      await locator.first().click({ timeout: 5000 })
      return
    } catch {
      // 認可画面が出ない場合、または候補が違う場合は次の候補を見る
    }
  }
}

test.describe('Local real login flow with logged-in Qiita session @local-only', () => {
  test.use({
    storageState: 'playwright/.auth/qiita.json',
  })

  test('should login through Qiita OAuth and create session cookie', async ({
    page,
    context,
  }) => {
    test.setTimeout(120000)

    await page.goto('http://localhost:3000')

    await page.getByRole('link', { name: 'Login', exact: true }).click()

    await expect(page).toHaveURL(/qiita\.com/, {
      timeout: 30000,
    })

    await approveQiitaAuthorizationIfNeeded(page)

    await expect(page).toHaveURL('http://localhost:3000/', {
      timeout: 60000,
    })

    const cookies = await context.cookies('http://localhost:3000')
    const sessionCookie = cookies.find((cookie) => {
      return cookie.name === 'sessionId'
    })

    expect(sessionCookie).toBeDefined()
    expect(sessionCookie?.value).not.toBe('')
    expect(sessionCookie?.httpOnly).toBe(true)
    expect(sessionCookie?.sameSite).toBe('Lax')
  })
})
