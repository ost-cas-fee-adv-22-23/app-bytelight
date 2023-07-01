import { expect, test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('do login', async ({ page }) => {
  await page.goto('/');
  await page.waitForURL('http://localhost:3000/login');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/.*.zitadel.cloud\/ui\/login\/login.*/);
  await expect(page).toHaveURL(/.*.zitadel.cloud\/ui\/login\/login.*/);
  const input = page.getByPlaceholder('username@domain');
  await input.fill('test-bytelight@smartive.zitadel.cloud');
  await page.getByText('next').click();
  await page.getByLabel('Password').fill('Bytelight1994!');
  await page.getByText('next').click();
  await page.getByRole('heading', { name: 'Willkommen auf Mumble' }).click();

  await page.context().storageState({ path: STORAGE_STATE });
});
