import { expect, test } from '@playwright/test';

const testIdPost = Math.floor(Math.random() * 1000);

test.describe('Mumble e2e Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('create a post', async ({ page }) => {
    expect(page.getByRole('heading', { name: 'Hey was gibts neues?' })).toBeVisible();
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST! id: ${testIdPost}`);
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    expect(await page.getByText(`Ich bin ein TEST! id: ${testIdPost}`).isVisible());
  });

  test('delete a post', async ({ page }) => {
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST, delete! id: ${testIdPost}`);
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    expect(page.getByText(`Ich bin ein TEST, delete! id: ${testIdPost}`).isVisible());
    // expect(await page.getByTestId('go-to-post').first().waitFor());
    // await page.getByTestId('go-to-post').first().click();
    // await page.waitForURL(/.*\/mumble\/.+/);
    // await expect(page).toHaveURL(/.*\/mumble\/.+/);
    // expect(await page.getByText(`Ich bin ein TEST, delete! id: ${testIdPost}`).isVisible());
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Delete' }).first().click()]);
  });

  test('like a post', async ({ page }) => {
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST! Für einen Like! id: ${testIdPost}`);
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    expect(page.getByText(`Ich bin ein TEST! Für einen Like! id: ${testIdPost}`).isVisible());
    await page.getByTestId('go-to-post').first().click();
    await page.waitForURL(/.*\/mumble\/.+/);
    await expect(page).toHaveURL(/.*\/mumble\/.+/);
    expect(page.getByText(`Ich bin ein TEST! Für einen Like! id: ${testIdPost}`));
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: '0 Likes' }).click()]);
    expect(await page.getByRole('button', { name: '1 Like' }).isVisible());
  });

  test('comment a post', async ({ page }) => {
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST! Für einen Kommentar! id: ${testIdPost}`);
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    expect(await page.getByText(`Ich bin ein TEST! Für einen Kommentar! id: ${testIdPost}`).isVisible());
    expect(await page.getByTestId('go-to-post').first().waitFor());
    await page.getByTestId('go-to-post').first().click();
    await page.waitForURL(/.*\/mumble\/.+/);
    await expect(page).toHaveURL(/.*\/mumble\/.+/);
    expect(await page.getByText(`Ich bin ein TEST! Für einen Kommentar! id: ${testIdPost}`).isVisible());
    await page.getByPlaceholder('Deine Meinung zählt').fill('Ich bin ein Kommentar!');
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    expect(await page.getByText('Ich bin ein Kommentar!').isVisible());
  });

  test('Go to the details page of my post', async ({ page }) => {
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST! Für einen Comment! id: ${testIdPost}`);
    await Promise.all([page.waitForResponse(/\/posts/), page.getByRole('button', { name: 'Absenden' }).click()]);
    expect(await page.getByText(`Ich bin ein TEST! Für einen Comment! id: ${testIdPost}`).isVisible());
    expect(await page.getByTestId('go-to-post').first().waitFor());
    await page.getByTestId('go-to-post').first().click();
    await page.waitForURL(/.*\/mumble\/.+/);
    await expect(page).toHaveURL(/.*\/mumble\/.+/);
    expect(await page.getByText(`Ich bin ein TEST! Für einen Comment! id: ${testIdPost}`).isVisible());
  });
});
