import { test, expect } from '@playwright/test'

// eslint-disable-next-line max-lines-per-function
test.describe('Navigation and Search Parameters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should update URL parameters when clicking a month in the side menu', async ({
    page,
  }) => {
    // 現在の年に近いものを選択（AccordionMenuのロジックに基づく）
    const currentYear = new Date().getFullYear().toString()
    const accordion = page.getByRole('button', {
      name: currentYear,
      exact: true,
    })

    await accordion.click()

    // aria-expanded が true になるのを待つ
    await expect(accordion).toHaveAttribute('aria-expanded', 'true')

    // 最初に見つかった月をクリック（12月が常に存在するとは限らないため）
    const monthLink = page.locator('nav').locator('a:has-text("月")').first()
    await expect(monthLink).toBeAttached({ timeout: 10000 })

    // Playwright の click が反応しない場合があるため、evaluate で確実にクリック
    await monthLink.evaluate((el) => {
      ;(el as HTMLElement).click()
    })

    // URLに期待するパラメータが含まれるまで待機
    await expect(page).toHaveURL(/startDate=\d{4}-/, { timeout: 15000 })
    await expect(page).toHaveURL(/endDate=\d{4}-/)
  })

  test('should navigate to item detail page when clicking a trend item', async ({
    page,
  }) => {
    const link = page
      .locator('.MuiContainer-root')
      .locator('a:has(.MuiListItem-root)')
      .first()

    await expect(link).toBeVisible({ timeout: 60000 })

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const href = (await link.getAttribute('href'))!

    await link.click()

    // 詳細ページに遷移したことをURLで確認
    await expect(page).toHaveURL(new RegExp(href))
  })

  test('should change items when navigating through pagination', async ({
    page,
  }) => {
    const itemLinks = page
      .locator('.MuiContainer-root')
      .locator('a[href*="/items/"]:has(.MuiListItem-root)')

    // 1ページ目のアイテムが表示されるのを待つ
    const firstItem = itemLinks.first()
    await expect(firstItem).toBeVisible({ timeout: 15000 })

    const firstItemTitle = await firstItem.innerText()
    expect(firstItemTitle.trim()).not.toBe('')

    // 2ページ目へのリンクをクリック
    const page2Link = page.getByRole('link', { name: 'Go to page 2' })
    await expect(page2Link).toBeVisible()
    // eslint-disable-next-line playwright/prefer-locator
    await page2Link.click()

    // URLにpage=2が含まれることを確認
    await expect(page).toHaveURL(/page=2/, { timeout: 15000 })

    // 2ページ目のアイテムが表示されるのを待つ
    const secondPageFirstItem = itemLinks.first()
    await expect(secondPageFirstItem).toBeVisible({ timeout: 15000 })

    // 1ページ目と異なるアイテムが表示されていることを確認
    await expect(secondPageFirstItem).not.toHaveText(firstItemTitle)
  })

  test('should keep existing query parameters when navigating through pagination', async ({
    page,
  }) => {
    // 検索パラメータ付きでページを開く
    await page.goto(
      'http://localhost:3000/?startDate=2016-01-01&endDate=2016-01-31',
    )

    const itemLinks = page
      .locator('.MuiContainer-root')
      .locator('a[href*="/items/"]:has(.MuiListItem-root)')

    // 1ページ目のアイテムが表示されるのを待つ
    const firstItem = itemLinks.first()
    await expect(firstItem).toBeVisible({ timeout: 15000 })

    // 2ページ目へのリンクをクリック
    const page2Link = page.getByRole('link', { name: 'Go to page 2' })
    await expect(page2Link).toBeVisible()
    // eslint-disable-next-line playwright/prefer-locator
    await page2Link.click()

    // URLにstartDate, endDate, page=2が含まれることを確認
    await expect(page).toHaveURL(/startDate=2016-01-01/, { timeout: 15000 })
    await expect(page).toHaveURL(/endDate=2016-01-31/)
    await expect(page).toHaveURL(/page=2/)
  })
})
