import { promises as fs } from 'node:fs';
import path from 'node:path';
import { test, expect } from '@playwright/test';
import { captureManifest } from './captures';
import {
  artifactPath,
  expectNoHorizontalOverflow,
  preparePage,
  recreateVisualArtifactDirectory,
  scrollGalleryToItem,
  scrollSectionIntoPosition,
  validatePng,
  visualArtifactRoot,
} from './helpers';

test('creates the default visual review set', async ({ browser, baseURL }) => {
  test.setTimeout(60_000);
  await recreateVisualArtifactDirectory();
  const outputs = [];
  for (const capture of captureManifest) {
    const context = await browser.newContext({
      viewport: capture.viewport,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(baseURL!, { waitUntil: 'networkidle' });
    await preparePage(page);
    await expectNoHorizontalOverflow(page);
    if (capture.target)
      await scrollSectionIntoPosition(
        page,
        capture.target,
        capture.offsetBelowHeader,
      );
    if (capture.gallery)
      await scrollGalleryToItem(
        page,
        capture.gallery.selector,
        capture.gallery.itemText,
      );
    const outputPath = artifactPath(capture.filename);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await page.screenshot({
      path: outputPath,
      fullPage: capture.fullPage ?? false,
      animations: 'disabled',
    });
    const footerBottom = capture.fullPage
      ? await page
          .locator('footer')
          .evaluate(
            (footer) => footer.getBoundingClientRect().bottom + window.scrollY,
          )
      : 0;
    const png = await validatePng(outputPath, capture.viewport.width);
    if (capture.fullPage)
      expect(png.height + 1).toBeGreaterThanOrEqual(Math.ceil(footerBottom));
    outputs.push({
      path: capture.filename.replaceAll('\\', '/'),
      viewport: capture.viewport,
      ...png,
      fullPage: Boolean(capture.fullPage),
      target: capture.target ?? 'page-start',
    });
    await context.close();
  }
  await fs.writeFile(
    path.join(visualArtifactRoot, 'manifest.json'),
    `${JSON.stringify(outputs, null, 2)}\n`,
  );
  expect(outputs).toHaveLength(22);
});
