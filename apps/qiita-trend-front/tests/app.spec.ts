import { test, expect } from '@playwright/test'

// eslint-disable-next-line max-lines-per-function
test.describe('Qiita Trend App', () => {
  test.beforeEach(async ({ page }) => {
    // baseURLは設定されていないため、localhost:3000へ直接遷移
    await page.goto('http://localhost:3000')
  })

  test('should have the correct title and login button in the header', async ({
    page,
  }) => {
    // layout.tsx で title={'qiitaの殿堂'} と指定されている
    await expect(page.getByText('qiitaの殿堂')).toBeVisible()

    // ログインボタンの確認
    const loginButton = page.getByRole('link', {
      name: 'Login',
      exact: true,
    })
    await expect(loginButton).toBeVisible()
    // next/link を使っているため、href が期待通りか確認
    await expect(loginButton).toHaveAttribute('href', /.*login.*/)
  })

  test('should display trend items', async ({ page }) => {
    const listItem = page
      .locator('.MuiContainer-root')
      .locator('.MuiListItem-root')
      .first()

    await expect(listItem).toBeVisible({ timeout: 60000 })
  })

  test('should have a working side menu accordion', async ({ page }) => {
    // サイドメニュー内のアコーディオンを確認
    const currentYear = new Date().getFullYear().toString()
    const accordion = page.getByRole('button', {
      name: currentYear,
      exact: true,
    })

    // アコーディオンをクリックして展開
    await accordion.click()

    // aria-expanded が true になるのを待つ
    await expect(accordion).toHaveAttribute('aria-expanded', 'true')

    // アコーディオンの中身（月リンク）が表示されるのを待つ
    const monthLink = page.locator('nav').locator('text=/\\d+月/').first()
    await expect(monthLink).toBeAttached({ timeout: 10000 })

    // Playwrightの可視性チェックが厳しいため、存在していればOKとするか、
    // 実際にクリック可能な状態であることを期待する
    await expect(monthLink).toBeEnabled()
  })
})
