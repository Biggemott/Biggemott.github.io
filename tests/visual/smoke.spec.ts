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
  '#background',
  '#contact',
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
      '#background h2',
      '#contact h2',
    ]) {
      const heading = page.locator(selector);
      await expectVisible(heading);
      await expect(heading).not.toHaveText(/^\s*$/);
    }

    const headerLinks = page.locator('.site-header__nav a');
    await expect(headerLinks).toHaveCount(5);
    await expect(headerLinks).toHaveText([
      'About',
      'Project',
      'Experience',
      'Expertise',
      'Contact',
    ]);
    await expect(headerLinks.nth(4)).toHaveAttribute('href', '#contact');
    await expect(
      page.locator('.hero__actions a', { hasText: 'Contact' }),
    ).toHaveAttribute('href', '#contact');
    await expect(page.locator('.hero__location')).toContainText(
      'On-site in Cyprus',
    );
    await expect(page.locator('#background')).toContainText(
      'on-site roles in Cyprus',
    );
    await expect(page.locator('.contact__intro')).toContainText(
      'on-site roles in Cyprus',
    );

    const email = page.locator('.contact__email');
    await expect(email).toHaveAttribute('href', 'mailto:biggemott@gmail.com');
    for (const [label, href] of [
      ['LinkedIn', 'https://linkedin.com/in/nikita-glazkov-3b1019144/'],
      ['Telegram', 'https://t.me/Biggemot'],
    ] as const) {
      const method = page.locator('.contact__method', { hasText: label });
      await expect(method).toContainText('Open profile');
      const action = method.locator('a');
      await expect(action).toHaveAttribute('href', href);
      await expect(action).toHaveAttribute('target', '_blank');
      await expect(action).toHaveAttribute('rel', 'noreferrer noopener');
    }
    const footer = page.locator('footer');
    const footerLinkedIn = footer.locator(
      'a[href="https://linkedin.com/in/nikita-glazkov-3b1019144/"]',
    );
    await expect(footerLinkedIn).toBeVisible();
    await expect(footerLinkedIn).toHaveAttribute('target', '_blank');
    await expect(footerLinkedIn).toHaveAttribute('rel', 'noreferrer noopener');
    const footerEmail = footer.getByRole('link', { name: 'Email' });
    await expect(footerEmail).toHaveAttribute(
      'href',
      'mailto:biggemott@gmail.com',
    );
    await expect(footerEmail).toHaveClass(/external-link/);
    await expect(footerEmail).not.toHaveAttribute('target', '_blank');
    const footerTelegram = footer.locator('a[href="https://t.me/Biggemot"]');
    await expect(footerTelegram).toBeVisible();
    await expect(footerTelegram).toHaveAttribute('target', '_blank');
    await expect(footerTelegram).toHaveAttribute('rel', 'noreferrer noopener');
  });
}
