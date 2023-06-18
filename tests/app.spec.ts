import { expect, test } from '@playwright/test';
import { makeLogin } from './utils';

test.beforeEach(async ({ page }) => {
  makeLogin(page);
});

test('test application', async ({ page }) => {
  await page.getByRole('heading', { name: 'Willkommen auf Mumble' }).click();
  await page.getByPlaceholder('Deine Meinung zählt').fill('Ich bin ein TEST!');
  await page.getByRole('button', { name: 'Absenden' }).click();
  await page.getByText('test bytelighttest-bytelightgerade jetztIch bin ein TEST!0 Coms0 LikesCopy Link ');
  expect(
    await page
      .getByText('test bytelighttest-bytelightgerade jetztIch bin ein TEST!0 Coms0 LikesCopy Link ')
      .screenshot({ scale: 'css', animations: 'disabled' })
  ).toMatchSnapshot('posted-comments.png');
});
