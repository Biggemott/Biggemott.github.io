export type Viewport = { width: number; height: number };

export type Capture = {
  filename: string;
  viewport: Viewport;
  fullPage?: boolean;
  target?: string;
  offsetBelowHeader?: number;
  gallery?: { selector: string; itemText: string };
};

export const captureManifest: Capture[] = [
  {
    filename: 'desktop/full-page.png',
    viewport: { width: 1440, height: 1024 },
    fullPage: true,
  },
  {
    filename: 'desktop/hero.png',
    viewport: { width: 1440, height: 1024 },
    target: '#hero',
  },
  {
    filename: 'desktop/personalization.png',
    viewport: { width: 1440, height: 1024 },
    target: '#personalization',
    offsetBelowHeader: 84,
  },
  {
    filename: 'desktop/cross-platform.png',
    viewport: { width: 1440, height: 1024 },
    target: '#cross-platform',
    offsetBelowHeader: 84,
  },
  {
    filename: 'desktop/product-completeness.png',
    viewport: { width: 1440, height: 1024 },
    target: '#product-completeness',
    offsetBelowHeader: 84,
  },
  {
    filename: 'desktop/architecture.png',
    viewport: { width: 1440, height: 1024 },
    target: '#architecture .section-heading',
    offsetBelowHeader: 84,
  },
  {
    filename: 'desktop/ai-workflow.png',
    viewport: { width: 1440, height: 1024 },
    target: '#ai-workflow',
    offsetBelowHeader: 84,
  },
  {
    filename: 'desktop/release-status.png',
    viewport: { width: 1440, height: 1024 },
    target: '#release-status',
    offsetBelowHeader: 84,
  },
  {
    filename: 'desktop/experience-top.png',
    viewport: { width: 1440, height: 1024 },
    target: '#experience',
    offsetBelowHeader: 84,
  },
  {
    filename: 'desktop/platform-experience.png',
    viewport: { width: 1440, height: 1024 },
    target: '#platform-experience',
    offsetBelowHeader: 84,
  },
  {
    filename: 'desktop/expertise.png',
    viewport: { width: 1440, height: 1024 },
    target: '#expertise',
    offsetBelowHeader: 84,
  },
  {
    filename: 'desktop/background-contact.png',
    viewport: { width: 1440, height: 1024 },
    target: '#background',
    offsetBelowHeader: 84,
  },
  {
    filename: 'desktop/contact.png',
    viewport: { width: 1440, height: 1024 },
    target: '#contact',
    offsetBelowHeader: 84,
  },
  {
    filename: 'mobile-390/full-page.png',
    viewport: { width: 390, height: 844 },
    fullPage: true,
  },
  {
    filename: 'mobile-390/hero.png',
    viewport: { width: 390, height: 844 },
    target: '#hero',
  },
  {
    filename: 'mobile-390/cross-platform.png',
    viewport: { width: 390, height: 844 },
    target: '#cross-platform',
    offsetBelowHeader: 26,
    gallery: { selector: '.platform-comparison__gallery', itemText: 'Android' },
  },
  {
    filename: 'mobile-390/product-completeness.png',
    viewport: { width: 390, height: 844 },
    target: '#product-completeness',
    offsetBelowHeader: 26,
    gallery: {
      selector: '.completeness-gallery',
      itemText: 'Find the right guidance',
    },
  },
  {
    filename: 'mobile-390/architecture.png',
    viewport: { width: 390, height: 844 },
    target: '#architecture .section-heading',
    offsetBelowHeader: 26,
  },
  {
    filename: 'mobile-390/ai-workflow.png',
    viewport: { width: 390, height: 844 },
    target: '#ai-workflow',
    offsetBelowHeader: 26,
  },
  {
    filename: 'mobile-390/release-status.png',
    viewport: { width: 390, height: 844 },
    target: '#release-status',
    offsetBelowHeader: 26,
  },
  {
    filename: 'mobile-320/product-completeness.png',
    viewport: { width: 320, height: 800 },
    target: '#product-completeness',
    offsetBelowHeader: 26,
    gallery: {
      selector: '.completeness-gallery',
      itemText: 'Find the right guidance',
    },
  },
  {
    filename: 'mobile-390/experience.png',
    viewport: { width: 390, height: 844 },
    target: '#experience',
    offsetBelowHeader: 26,
  },
  {
    filename: 'mobile-390/expertise.png',
    viewport: { width: 390, height: 844 },
    target: '#expertise',
    offsetBelowHeader: 26,
  },
  {
    filename: 'mobile-390/contact.png',
    viewport: { width: 390, height: 844 },
    target: '#contact',
    offsetBelowHeader: 26,
  },
  {
    filename: 'mobile-320/experience.png',
    viewport: { width: 320, height: 800 },
    target: '#experience',
    offsetBelowHeader: 26,
  },
  {
    filename: 'mobile-320/contact.png',
    viewport: { width: 320, height: 800 },
    target: '#contact',
    offsetBelowHeader: 26,
  },
];
