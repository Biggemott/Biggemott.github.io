import { test, expect } from '@playwright/test';
import {
  expectNoHorizontalOverflow,
  expectVisible,
  preparePage,
} from './helpers';

const viewports = [
  { width: 1440, height: 1024 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 320, height: 800 },
];
const sections = [
  '#hero',
  '#about',
  '#project',
  '#product-experience',
  '#personalization',
  '#cross-platform',
  '#product-completeness',
  '#ownership',
  '#architecture',
  '#quality-workflow',
  '#release-status',
  '#experience',
  '#leadership',
  '#expertise',
];

for (const viewport of viewports) {
  test(`responsive smoke check at ${viewport.width}x${viewport.height}`, async ({
    page,
    baseURL,
  }) => {
    await page.setViewportSize(viewport);
    const response = await page.goto(baseURL!, { waitUntil: 'networkidle' });
    expect(response?.ok()).toBeTruthy();
    await preparePage(page);
    await expectNoHorizontalOverflow(page);
    for (const selector of sections)
      await expectVisible(page.locator(selector));
    await expectVisible(page.locator('footer'));
    await page
      .locator('.site-header')
      .evaluate((header) => header.scrollIntoView());
    await expect(page.locator('.site-header')).toBeVisible();
    for (const selector of [
      '#about h2',
      '#project h2',
      '#product-experience h2',
      '#personalization h2',
      '#cross-platform h2',
      '#product-completeness h2',
      '#ownership h2',
      '#architecture h2',
      '#quality-workflow h2',
      '#release-status h2',
      '#experience h2',
      '#leadership h2',
      '#expertise h2',
    ]) {
      const heading = page.locator(selector);
      await expectVisible(heading);
      await expect(heading).not.toHaveText(/^\s*$/);
    }
  });
}
