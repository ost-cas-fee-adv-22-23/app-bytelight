import { expect, test } from '@playwright/test';
import { makeLogin } from './test-utils';

test.describe('Mumble e2e Tests', () => {
  test.beforeEach(async ({ page }) => {
    makeLogin(page);
  });

  test('create a post', async ({ page }) => {
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

  test('delete a post', async ({ page }) => {
    await page.getByRole('heading', { name: 'Willkommen auf Mumble' }).click();
    await page.getByPlaceholder('Deine Meinung zählt').fill('Ich bin ein TEST!');
    await page.getByRole('button', { name: 'Absenden' }).click();
    await page.getByText('test bytelighttest-bytelightgerade jetztIch bin ein TEST!0 Coms0 LikesCopy Link ');

    // await page.getByRole('button', { name: 'Delete' }).nth(0).click(), page.waitForResponse(/posts/);

    await Promise.all([page.getByRole('button', { name: 'Delete' }).nth(0).click(), page.waitForResponse(/\/posts/)]);
  });

  test('like a post', async ({ page }) => {
    const testIdPost = Math.floor(Math.random() * 100);
    await page.getByRole('heading', { name: 'Willkommen auf Mumble' }).click();
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST! Für einen Like! id:${testIdPost}`);
    await page.getByRole('button', { name: 'Absenden' }).click();
    await page.waitForLoadState('networkidle');

    expect(page.waitForSelector(`"Ich bin ein TEST! Für einen Like! id:${testIdPost}"`));
    await page.waitForLoadState('networkidle');

    await page
      .getByRole('listitem')
      .filter({ hasText: `test bytelighttest-bytelightgerade jetztIch bin ein TEST! Für einen Like! id:${testIdPost}` })
      .getByRole('button', { name: '0 Likes' })
      .click();
    await page.waitForLoadState('networkidle');

    page
      .getByRole('listitem')
      .filter({ hasText: `test bytelighttest-bytelightgerade jetztIch bin ein TEST! Für einen Like! id:${testIdPost}` })
      .getByRole('button', { name: '1 Like' });
  });

  test('comment my post', async ({ page }) => {
    const testIdPost = Math.floor(Math.random() * 100);
    await page.getByRole('heading', { name: 'Willkommen auf Mumble' }).click();
    await page.getByPlaceholder('Deine Meinung zählt').fill(`Ich bin ein TEST! Für einen Comment! id:${testIdPost}`);
    await page.getByRole('button', { name: 'Absenden' }).click();
    await page.waitForLoadState('networkidle');

    expect(page.waitForSelector(`"Ich bin ein TEST! Für einen Comment! id:${testIdPost}"`));
    await page.waitForLoadState('networkidle');

    await page
      .getByRole('listitem')
      .filter({ hasText: `test bytelighttest-bytelightgerade jetztIch bin ein TEST! Für einen Comment! id:${testIdPost}` })
      .getByRole('button', { name: '0 Coms' })
      .click();
    await page.waitForLoadState('networkidle');

    page
      .getByRole('listitem')
      .filter({ hasText: `test bytelighttest-bytelightgerade jetztIch bin ein TEST! Für einen Like! id:${testIdPost}` })
      .getByRole('button', { name: '1 Coms' });
  });
});
