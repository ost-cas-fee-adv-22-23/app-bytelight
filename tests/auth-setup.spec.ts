import { test } from '@playwright/test';

test('test login screen', async ({ page }) => {
  await page.goto('http://localhost:3000/api/auth/signin?csrf=true');
  await page.getByRole('button', { name: 'Sign in with zitadel' }).click();
  const input = page.getByPlaceholder('username@domain');
  await input.fill('mb@smartive.zitadel.cloud');
  await page.getByText('next').click();
  await page.getByLabel('Password').fill('Bfcuk1994pn1994!');
  await page.getByText('next').click();
  await page.getByRole('heading', { name: 'Willkommen auf Mumble' }).click();
});
