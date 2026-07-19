import { test, expect } from '@playwright/test';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import {
  expectNoHorizontalOverflow,
  expectVisible,
  preparePage,
} from './helpers';

const viewports = [
  { width: 1440, height: 1024 },
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 360, height: 800 },
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

test.beforeEach(async ({ page }) => {
  await page.route('https://cloud.umami.is/**', (route) =>
    route.fulfill({ contentType: 'application/javascript', body: '' }),
  );
});

test('Umami tracker and declarative event attributes are production-safe', async ({
  page,
  baseURL,
}) => {
  await page.goto(baseURL!, { waitUntil: 'networkidle' });

  const tracker = page.locator(
    'script[src="https://cloud.umami.is/script.js"]',
  );
  await expect(tracker).toHaveCount(1);
  await expect(tracker).toHaveAttribute(
    'data-website-id',
    'b3b6eef8-4560-4fdc-8c7e-9e3a49e43e92',
  );
  await expect(tracker).toHaveAttribute('defer', '');
  await expect(tracker).toHaveAttribute('data-domains', 'biggemott.github.io');
  await expect(tracker).not.toHaveAttribute('data-do-not-track');
  await expect(tracker).toHaveAttribute('data-performance', 'true');
  await expect(tracker).toHaveAttribute('data-exclude-hash', 'true');
  await expect(tracker).not.toHaveAttribute('data-exclude-search');

  const analyticsAudit = await page.evaluate(() => {
    const prohibitedProviderPatterns = [
      /google-analytics/i,
      /googletagmanager/i,
      /plausible/i,
      /fathom/i,
      /segment/i,
    ];
    const analyticsLinks = Array.from(
      document.querySelectorAll<HTMLElement>('[data-umami-event]'),
    ).map((element) => ({
      event: element.getAttribute('data-umami-event'),
      properties: Array.from(element.attributes)
        .filter((attribute) => attribute.name.startsWith('data-umami-event-'))
        .map((attribute) => `${attribute.name}=${attribute.value}`),
    }));

    return {
      otherAnalyticsProviders: Array.from(document.scripts)
        .map((script) => script.src)
        .filter((src) =>
          prohibitedProviderPatterns.some((pattern) => pattern.test(src)),
        ),
      cvEvents: analyticsLinks.filter((link) => link.event === 'file-download'),
      contactEvents: analyticsLinks.filter(
        (link) => link.event === 'contact-click',
      ),
      productEvents: analyticsLinks.filter(
        (link) => link.event === 'product-link-click',
      ),
      featuredProjectEvents: analyticsLinks.filter(
        (link) => link.event === 'featured-project-click',
      ),
      headerEvents: Array.from(
        document.querySelectorAll('.site-header [data-umami-event]'),
      ).length,
      eventProperties: analyticsLinks.flatMap((link) => link.properties),
    };
  });

  expect(analyticsAudit.otherAnalyticsProviders).toEqual([]);
  expect(analyticsAudit.cvEvents).toEqual([
    {
      event: 'file-download',
      properties: [
        'data-umami-event-file=Nikita-Glazkov-Senior-Lead-Android-Engineer-CV.pdf',
        'data-umami-event-placement=hero',
      ],
    },
    {
      event: 'file-download',
      properties: [
        'data-umami-event-file=Nikita-Glazkov-Senior-Lead-Android-Engineer-CV.pdf',
        'data-umami-event-placement=contact',
      ],
    },
  ]);
  expect(analyticsAudit.contactEvents).toHaveLength(7);
  expect(
    analyticsAudit.contactEvents.every(({ properties }) => {
      const values = Object.fromEntries(
        properties.map((property) => property.split('=')),
      );
      return (
        ['email', 'linkedin', 'telegram'].includes(
          values['data-umami-event-channel'],
        ) &&
        ['hero', 'contact', 'footer'].includes(
          values['data-umami-event-placement'],
        )
      );
    }),
  ).toBeTruthy();
  expect(analyticsAudit.productEvents).toHaveLength(6);
  expect(
    analyticsAudit.productEvents.every(({ properties }) => {
      const values = Object.fromEntries(
        properties.map((property) => property.split('=')),
      );
      return (
        [
          'tapyou',
          'brokstock',
          'raiffeisen',
          'yandex-phone',
          'yotaphone-2',
        ].includes(values['data-umami-event-product']) &&
        ['google-play', 'app-store', 'product-overview'].includes(
          values['data-umami-event-destination'],
        )
      );
    }),
  ).toBeTruthy();
  expect(analyticsAudit.featuredProjectEvents).toEqual([
    {
      event: 'featured-project-click',
      properties: ['data-umami-event-placement=hero'],
    },
  ]);
  expect(analyticsAudit.headerEvents).toBe(0);
  expect(analyticsAudit.eventProperties).not.toContainEqual(
    expect.stringMatching(
      /@|mailto:|linkedin\.com|t\.me|biggemott@gmail\.com|https?:\/\//i,
    ),
  );
});

test('production markup is semantically complete and internally linked', async ({
  page,
  baseURL,
}) => {
  await page.goto(baseURL!, { waitUntil: 'networkidle' });
  const audit = await page.evaluate(() => {
    const ids = Array.from(document.querySelectorAll<HTMLElement>('[id]')).map(
      (element) => element.id,
    );
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    const fragmentTargets = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    ).map((link) => link.getAttribute('href')!.slice(1));
    const missingFragmentTargets = [...new Set(fragmentTargets)].filter(
      (id) => document.querySelectorAll(`#${CSS.escape(id)}`).length !== 1,
    );
    const invalidAriaLabelledBy = Array.from(
      document.querySelectorAll<HTMLElement>('[aria-labelledby]'),
    ).flatMap((element) =>
      element
        .getAttribute('aria-labelledby')!
        .split(/\s+/)
        .filter(
          (id) => document.querySelectorAll(`#${CSS.escape(id)}`).length !== 1,
        ),
    );
    const emptyInteractive = Array.from(
      document.querySelectorAll<HTMLElement>('a, button'),
    ).filter(
      (element) =>
        !element.textContent?.trim() && !element.getAttribute('aria-label'),
    ).length;

    return {
      duplicateIds,
      missingFragmentTargets,
      invalidAriaLabelledBy,
      emptyInteractive,
      nestedInteractive: document.querySelectorAll(
        'a a, a button, button a, button button',
      ).length,
      headingCounts: [1, 2, 3, 4, 5, 6].map(
        (level) => document.querySelectorAll(`h${level}`).length,
      ),
      landmarkCounts: {
        header: document.querySelectorAll('header').length,
        nav: document.querySelectorAll('nav').length,
        main: document.querySelectorAll('main').length,
        footer: document.querySelectorAll('footer').length,
      },
      imageIssues: Array.from(document.images).filter(
        (image) => !image.hasAttribute('alt'),
      ).length,
      unsafeExternalLinks: Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'),
      ).filter((link) => {
        const rel = link.rel.split(/\s+/);
        return !rel.includes('noopener') || !rel.includes('noreferrer');
      }).length,
      mailtoTargets: Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]'),
      ).filter((link) => link.target).length,
    };
  });

  expect(audit.duplicateIds).toEqual([]);
  expect(audit.missingFragmentTargets).toEqual([]);
  expect(audit.invalidAriaLabelledBy).toEqual([]);
  expect(audit.emptyInteractive).toBe(0);
  expect(audit.nestedInteractive).toBe(0);
  expect(audit.headingCounts[0]).toBe(1);
  expect(audit.landmarkCounts).toEqual({
    header: 1,
    nav: 2,
    main: 1,
    footer: 1,
  });
  expect(audit.imageIssues).toBe(0);
  expect(audit.unsafeExternalLinks).toBe(0);
  expect(audit.mailtoTargets).toBe(0);
});

test('fragment navigation keeps targets visible below the sticky header', async ({
  page,
  baseURL,
}) => {
  await page.setViewportSize({ width: 1440, height: 1024 });
  for (const fragment of [
    '#about',
    '#project',
    '#experience',
    '#expertise',
    '#contact',
  ]) {
    await page.goto(`${baseURL}${fragment}`, { waitUntil: 'networkidle' });
    const offset = await page.evaluate((target) => {
      const targetElement = document.querySelector(target);
      const header = document.querySelector('.site-header');
      if (!targetElement || !header) return Number.NEGATIVE_INFINITY;
      return (
        targetElement.getBoundingClientRect().top -
        header.getBoundingClientRect().bottom
      );
    }, fragment);
    expect(offset).toBeGreaterThanOrEqual(-1);
  }
});

test('mobile navigation closes with Escape and after a selection', async ({
  page,
  baseURL,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL!, { waitUntil: 'networkidle' });
  const toggle = page.locator('.site-header__toggle');
  await expect(toggle).toHaveAttribute('aria-controls', 'primary-navigation');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();

  await toggle.click();
  await page.locator('.site-header__nav a[href="#contact"]').click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).not.toBeFocused();
});

test('mobile navigation preserves native fragment scrolling after a selection', async ({
  page,
  baseURL,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const destinations = [
    ['#experience', '#contact'],
    ['#project', '#contact'],
    ['#expertise', '#contact'],
    ['#contact', '#about'],
  ] as const;

  for (const [fragment, startingPoint] of destinations) {
    await page.goto(baseURL!, { waitUntil: 'networkidle' });
    await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) throw new Error(`Missing ${selector}`);
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, Math.max(500, elementTop));
      document.documentElement.style.removeProperty('scroll-behavior');
    }, startingPoint);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    const toggle = page.locator('.site-header__toggle');
    await toggle.click();
    const link = page.locator(`.site-header__nav a[href="${fragment}"]`);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${fragment}$`));
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('.site-header')).not.toHaveClass(/is-open/);
    await expect(toggle).not.toBeFocused();
    await page.waitForFunction((selector) => {
      const target = document.querySelector<HTMLElement>(selector);
      const header = document.querySelector<HTMLElement>('.site-header');
      return Boolean(
        target &&
        header &&
        target.getBoundingClientRect().top >=
          header.getBoundingClientRect().bottom - 1 &&
        target.getBoundingClientRect().top < window.innerHeight,
      );
    }, fragment);

    const position = await page.evaluate((selector) => {
      const target = document.querySelector<HTMLElement>(selector);
      const header = document.querySelector<HTMLElement>('.site-header');
      if (!target || !header) throw new Error(`Missing ${selector}`);
      const targetTop = target.getBoundingClientRect().top;
      const headerBottom = header.getBoundingClientRect().bottom;
      const targetDocumentTop = targetTop + window.scrollY;
      return {
        targetTop,
        headerBottom,
        scrollY: window.scrollY,
        targetDocumentTop,
        viewportHeight: window.innerHeight,
      };
    }, fragment);
    expect(position.targetTop).toBeGreaterThanOrEqual(
      position.headerBottom - 1,
    );
    expect(position.scrollY).toBeGreaterThan(
      position.targetDocumentTop - position.viewportHeight,
    );
    expect(position.scrollY).toBeLessThanOrEqual(
      position.targetDocumentTop + 1,
    );
  }
});

test('production metadata and discovery files are complete', async ({
  page,
  baseURL,
}) => {
  const response = await page.goto(baseURL!, { waitUntil: 'networkidle' });
  expect(response?.ok()).toBeTruthy();

  const title = 'Nikita Glazkov — Senior / Lead Android Engineer';
  const description =
    'Senior / Lead Android Engineer with 13+ years of experience in Kotlin, Jetpack Compose, mobile architecture, Kotlin Multiplatform, media, fintech and Android platform engineering.';
  const canonicalUrl = 'https://biggemott.github.io/';
  const imageUrl = 'https://biggemott.github.io/og-image.png';
  const imageAlt = 'Nikita Glazkov — Senior / Lead Android Engineer portfolio';

  await expect(page).toHaveTitle(title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    description,
  );
  await expect(page.locator('meta[name="author"]')).toHaveAttribute(
    'content',
    'Nikita Glazkov',
  );
  await expect(page.locator('meta[name="theme-color"]')).toHaveCount(1);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    canonicalUrl,
  );
  for (const [property, content] of [
    ['og:type', 'website'],
    ['og:title', title],
    ['og:description', description],
    ['og:url', canonicalUrl],
    ['og:image', imageUrl],
    ['og:image:width', '1200'],
    ['og:image:height', '630'],
    ['og:image:alt', imageAlt],
  ])
    await expect(page.locator(`meta[property="${property}"]`)).toHaveAttribute(
      'content',
      content,
    );
  for (const [name, content] of [
    ['twitter:card', 'summary_large_image'],
    ['twitter:title', title],
    ['twitter:description', description],
    ['twitter:image', imageUrl],
  ])
    await expect(page.locator(`meta[name="${name}"]`)).toHaveAttribute(
      'content',
      content,
    );
  const faviconLinks = page.locator('link[rel="icon"]');
  await expect(faviconLinks).toHaveCount(2);
  await expect(faviconLinks.nth(0)).toHaveAttribute('href', '/favicon.ico');
  await expect(faviconLinks.nth(0)).toHaveAttribute(
    'sizes',
    '16x16 32x32 48x48',
  );
  await expect(faviconLinks.nth(1)).toHaveAttribute('href', '/favicon.svg');
  await expect(faviconLinks.nth(1)).toHaveAttribute('type', 'image/svg+xml');
  await expect(faviconLinks.nth(1)).toHaveAttribute('sizes', 'any');
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    'href',
    '/apple-touch-icon.png',
  );
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    'sizes',
    '180x180',
  );
  await expect(page.locator('h1')).toHaveCount(1);
  expect(await page.content()).not.toContain('localhost');
  await expect(
    page.getByText('Built with Astro, TypeScript and vanilla CSS.', {
      exact: true,
    }),
  ).toHaveCount(1);

  const robots = await page.request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain(
    'Sitemap: https://biggemott.github.io/sitemap.xml',
  );
  const sitemap = await page.request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain(canonicalUrl);
  expect([...sitemapText.matchAll(/<loc>/g)]).toHaveLength(1);
  for (const iconPath of [
    '/favicon.ico',
    '/favicon.svg',
    '/apple-touch-icon.png',
  ]) {
    const iconResponse = await page.request.get(iconPath);
    expect(iconResponse.ok()).toBeTruthy();
  }
  expect(await page.content()).not.toContain('astro-icon');
});

test('CV download is published once in Hero and Contact', async ({
  page,
  baseURL,
}) => {
  const cvPath = '/Nikita-Glazkov-Senior-Lead-Android-Engineer-CV.pdf';
  const cvFilename = 'Nikita-Glazkov-Senior-Lead-Android-Engineer-CV.pdf';
  const cvAriaLabel = "Download Nikita Glazkov's CV as PDF";
  const response = await page.request.get(cvPath);

  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toMatch(/application\/pdf/i);
  expect((await response.body()).byteLength).toBeGreaterThan(0);

  await page.goto(baseURL!, { waitUntil: 'networkidle' });
  const heroLink = page.locator('#hero a', { hasText: 'Download CV' });
  const contactLink = page.locator('#contact a', { hasText: 'Download PDF' });
  await expect(heroLink).toHaveCount(1);
  await expect(contactLink).toHaveCount(1);
  for (const link of [heroLink, contactLink]) {
    await expect(link).toHaveAttribute('href', cvPath);
    await expect(link).toHaveAttribute('download', cvFilename);
    await expect(link).not.toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('aria-label', cvAriaLabel);
  }
  await expect(page.locator('header a', { hasText: /CV/i })).toHaveCount(0);
  await expect(page.locator('footer a', { hasText: /CV/i })).toHaveCount(0);
  await expect(page.locator('a[href$=".docx" i]')).toHaveCount(0);
  expect(cvPath.startsWith('/')).toBeTruthy();

  for (const directory of ['public', 'dist']) {
    const files = await fs.readdir(path.join(process.cwd(), directory));
    expect(
      files.some((file) => file.toLowerCase().endsWith('.docx')),
    ).toBeFalsy();
  }
});

for (const viewport of viewports) {
  test(`responsive smoke check at ${viewport.width}x${viewport.height}`, async ({
    page,
    baseURL,
  }) => {
    await page.setViewportSize(viewport);
    const consoleErrors: string[] = [];
    const failedSameOriginRequests: string[] = [];
    const baseOrigin = new URL(baseURL!).origin;
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('requestfailed', (request) => {
      if (new URL(request.url()).origin === baseOrigin)
        failedSameOriginRequests.push(request.url());
    });
    page.on('response', (response) => {
      if (
        response.status() >= 400 &&
        new URL(response.url()).origin === baseOrigin
      )
        failedSameOriginRequests.push(`${response.status()} ${response.url()}`);
    });
    const response = await page.goto(baseURL!, { waitUntil: 'networkidle' });
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('img[loading="lazy"]')).toHaveCount(14);
    await preparePage(page);
    await expectNoHorizontalOverflow(page);
    expect(consoleErrors).toEqual([]);
    expect(failedSameOriginRequests).toEqual([]);
    await expect
      .poll(() =>
        page
          .locator('img')
          .evaluateAll((images) =>
            images.every(
              (image) =>
                image instanceof HTMLImageElement &&
                image.complete &&
                image.naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
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
    const heroLinkedIn = page.locator('.hero__actions a', {
      hasText: 'LinkedIn',
    });
    await expect(heroLinkedIn).toHaveAttribute('target', '_blank');
    await expect(heroLinkedIn).toHaveAttribute('rel', 'noreferrer noopener');
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
