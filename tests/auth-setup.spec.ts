import { expect, test } from '@playwright/test';

test('test login screen', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Login/);
  await page.click('"Login"');
  await page.waitForURL(`https://cas-fee-advanced-ocvdad.zitadel.cloud/**`);
  const input = page.getByPlaceholder('username@domain');
  await input.fill('test-bytelight@smartive.zitadel.cloud');
  await page.getByText('next').click();
  await page.getByLabel('Password').fill('Bytelight1994!');
  await page.getByText('next').click();

  await page.getByRole('heading', { name: 'Willkommen auf Mumble' }).click();
});
