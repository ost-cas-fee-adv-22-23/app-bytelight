import { expect, test } from '@playwright/test';

test.describe('Visual comparison', () => {
  test('test logout screen', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Log Out' }).click();
    await page.waitForLoadState('networkidle');
    expect(page.getByRole('heading', { name: 'Hey there.' })).toBeTruthy();
    expect(await page.screenshot({ scale: 'css', animations: 'disabled' })).toMatchSnapshot('login-page.png');
  });
});
