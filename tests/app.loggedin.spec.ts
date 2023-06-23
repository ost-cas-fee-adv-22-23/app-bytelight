import { expect, test } from '@playwright/test';

const testIdPost = Math.floor(Math.random() * 1000);

test.describe('Mumble e2e Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });
  test('create a post', async ({ page }) => {
    expect(page.getByRole('heading', { name: 'Hey was gibts neues?' })).toBeVisible();
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST! id: ${testIdPost}`);
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    await page.getByText(`Ich bin ein TEST! id: ${testIdPost}`).waitFor();
  });

  test('delete a post', async ({ page }) => {
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST, delete! id: ${testIdPost}`);
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    await page.waitForLoadState('networkidle');
    await page.getByText(`Ich bin ein TEST, delete! id: ${testIdPost}`).waitFor();
    await page.getByTestId('go-to-post').nth(0).click();
    await page.waitForURL(/.*\/mumble\/.+/);
    await page.waitForLoadState('networkidle');
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Delete' }).click()]);
  });

  test('like a post', async ({ page }) => {
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST! Für einen Like! id: ${testIdPost}`);
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    await page.waitForLoadState('networkidle');
    await page.getByText(`Ich bin ein TEST! Für einen Like! id: ${testIdPost}`).waitFor();
    await page.getByTestId('go-to-post').first().click();
    await page.waitForURL(/.*\/mumble\/.+/);
    await page.waitForLoadState('networkidle');
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: '0 Likes' }).click()]);
  });

  test('comment a post', async ({ page }) => {
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST! Für einen Kommentar! id: ${testIdPost}`);
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    await page.waitForLoadState('networkidle');
    await page.getByText(`Ich bin ein TEST! Für einen Kommentar! id: ${testIdPost}`, { exact: true }).waitFor();
    await page.getByTestId('go-to-post').first().click();
    await page.waitForURL(/.*\/mumble\/.+/);
    await page.waitForLoadState('networkidle');
    await page.getByPlaceholder('Deine Meinung zählt').fill('Ich bin ein Kommentar!');
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    await page.getByText('Ich bin ein Kommentar!').waitFor();
  });

  test('Go to the details page of my post', async ({ page }) => {
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST! Für einen Comment! id: ${testIdPost}`);
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    await page.waitForLoadState('networkidle');
    await page.getByText(`Ich bin ein TEST! Für einen Comment! id: ${testIdPost}`).waitFor();
    await page.getByTestId('go-to-post').first().click();
    await page.waitForURL(/.*\/mumble\/.+/);
    await page.waitForLoadState('networkidle');
    await page.getByText(`Ich bin ein TEST! Für einen Comment! id: ${testIdPost}`).waitFor();
  });

  test('test logout screen', async ({ page }) => {
    await page.getByRole('button', { name: 'Log Out' }).click();
    await page.waitForLoadState('networkidle');
    expect(page.getByRole('heading', { name: 'Hey there.' })).toBeTruthy();
    expect(await page.screenshot({ scale: 'css', animations: 'disabled' })).toMatchSnapshot('login-page.png');
  });
});
