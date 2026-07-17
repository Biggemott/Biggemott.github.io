import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Locator, Page } from '@playwright/test';

export const visualArtifactRoot = path.join(
  process.cwd(),
  'artifacts',
  'visual-review',
);

export async function preparePage(page: Page) {
  await page.addStyleTag({
    content:
      '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}',
  });
  await page.evaluate(() =>
    document.querySelectorAll('img').forEach((image) => {
      image.loading = 'eager';
    }),
  );
  await progressivelyScroll(page);
  await waitForImages(page);
  await waitForStableHeight(page);
  await page.evaluate(() => window.scrollTo(0, 0));
}

export async function progressivelyScroll(page: Page) {
  for (
    let position = 0;
    position <
    (await page.evaluate(() => document.documentElement.scrollHeight));
    position += 800
  ) {
    await page.evaluate((top) => window.scrollTo(0, top), position);
    await page.waitForTimeout(50);
  }
}

export async function waitForImages(page: Page) {
  await page.waitForFunction(() =>
    Array.from(document.images).every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
}

export async function waitForStableHeight(page: Page) {
  let previous = 0;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const current = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    if (current === previous) return;
    previous = current;
    await page.waitForTimeout(100);
  }
  throw new Error('Document height did not stabilize');
}

export async function scrollSectionIntoPosition(
  page: Page,
  selector: string,
  offset = 0,
) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.evaluate(
    ({ selector: target, offsetBelowHeader }) => {
      const element = document.querySelector(target);
      const header = document.querySelector('.site-header');
      if (!element) throw new Error(`Missing ${target}`);
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      window.scrollTo({
        top: Math.max(
          0,
          element.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            offsetBelowHeader,
        ),
        behavior: 'auto',
      });
    },
    { selector, offsetBelowHeader: offset },
  );
}

export async function scrollGalleryToItem(
  page: Page,
  gallerySelector: string,
  itemText: string,
) {
  const gallery = page.locator(gallerySelector);
  const item = gallery
    .locator(':scope > *')
    .filter({ hasText: itemText })
    .first();
  await item.waitFor();
  await item.evaluate((element) => {
    const parent = element.parentElement;
    if (parent) parent.scrollLeft = (element as HTMLElement).offsetLeft;
  });
}

export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  if (overflow > 2)
    throw new Error(`Document horizontal overflow is ${overflow}px`);
}

export async function recreateVisualArtifactDirectory() {
  await fs.rm(visualArtifactRoot, { recursive: true, force: true });
  await fs.mkdir(visualArtifactRoot, { recursive: true });
}

export async function validatePng(filePath: string, expectedWidth: number) {
  const buffer = await fs.readFile(filePath);
  if (buffer.byteLength === 0 || buffer.toString('ascii', 1, 4) !== 'PNG')
    throw new Error(`Invalid PNG: ${filePath}`);
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  if (width !== expectedWidth)
    throw new Error(
      `Expected ${expectedWidth}px PNG width, got ${width}px: ${filePath}`,
    );
  return { width, height, byteSize: buffer.byteLength };
}

export function artifactPath(filename: string) {
  return path.join(visualArtifactRoot, filename);
}

export async function expectVisible(locator: Locator) {
  await locator.scrollIntoViewIfNeeded();
  await locator.waitFor({ state: 'visible' });
}
