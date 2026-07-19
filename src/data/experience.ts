export interface ExternalProductLink {
  label: string;
  url: string;
  ariaLabel: string;
  variant?: 'store' | 'context';
  analyticsData: {
    product:
      'tapyou' | 'brokstock' | 'raiffeisen' | 'yandex-phone' | 'yotaphone-2';
    destination: 'google-play' | 'app-store' | 'product-overview';
  };
}

export interface ContributionGroup {
  title: string;
  description: string;
}

export interface FeaturedCommercialRole {
  product: string;
  role: string;
  links: readonly ExternalProductLink[];
  summary: string;
  contributions: readonly ContributionGroup[];
  leadershipNote: string;
}

export interface PlatformEngineeringEntry {
  product: string;
  role: string;
  description: string;
  tags: readonly string[];
  link: ExternalProductLink;
}

export interface CompactSupportingExperience {
  product: string;
  role: string;
  link: ExternalProductLink;
  summary: string;
  contributions: readonly ContributionGroup[];
}

export interface LeadershipFact {
  value: string;
  label: string;
}

export interface LeadershipArea {
  title: string;
  description: string;
}

export interface ExpertiseGroup {
  title: string;
  items: readonly string[];
}

export const featuredCommercialRoles = [
  {
    product: 'TapYou',
    role: 'Android Team Lead · Hands-on product engineering',
    links: [
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.tapyou.app&hl=en',
        ariaLabel: 'Open TapYou on Google Play in a new tab',
        analyticsData: { product: 'tapyou', destination: 'google-play' },
      },
    ],
    summary:
      'Led Android development for a real-time social media product while remaining deeply hands-on across video, communication features and a gradual modernization of the production codebase.',
    contributions: [
      {
        title: 'Native media processing',
        description:
          'Built native video import and splitting with MediaCodec and MediaMuxer.',
      },
      {
        title: 'Export pipeline evolution',
        description:
          'Evolved video assembly and export from FFmpeg toward native Android processing and later Media3 Transformer, reducing maintenance overhead and simplifying future development.',
      },
      {
        title: 'Real-time communication',
        description:
          'Implemented WebRTC-based communication features for a media-heavy consumer product.',
      },
      {
        title: 'Complex media UI',
        description:
          'Built a performant two-dimensional RecyclerView media grid for browsing and selecting content.',
      },
      {
        title: 'Production modernization',
        description:
          'Led the gradual migration from MVP, Moxy, RxJava and Android Views toward MVVM, Coroutines and Jetpack Compose without stopping feature delivery.',
      },
    ],
    leadershipNote:
      'Led a team of 2–3 engineers, personally hired and mentored four developers and remained approximately 80% hands-on. I fostered an open, collaborative engineering environment where architecture decisions were discussed and shaped together while remaining grounded in production constraints.',
  },
  {
    product: 'BCS / BROKSTOCK',
    role: 'Mobile Team Lead · Product foundation and first releases',
    links: [
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.bcsmarkets.bcstrade',
        ariaLabel: 'Open BROKSTOCK on Google Play in a new tab',
        analyticsData: { product: 'brokstock', destination: 'google-play' },
      },
      {
        label: 'App Store',
        url: 'https://apps.apple.com/za/app/brokstock-save-invest-trade/id1554064793',
        ariaLabel: 'Open BROKSTOCK on the App Store in a new tab',
        analyticsData: { product: 'brokstock', destination: 'app-store' },
      },
    ],
    summary:
      'Joined at the idea and partial-UI stage as the first mobile engineer, established the Android foundation and helped build the Android and iOS teams that delivered the first product releases in around six months.',
    contributions: [
      {
        title: 'Core Android foundation',
        description:
          'Established the application structure and foundational flows for authentication, market data, real-time WebSocket updates and chart integration.',
      },
      {
        title: 'Product delivery',
        description:
          'Turned an early product concept into a maintainable mobile foundation while continuing to deliver user-facing investing functionality.',
      },
      {
        title: 'Cross-platform team building',
        description:
          'Helped form parallel Android and iOS teams and coordinate delivery across the two mobile platforms.',
      },
      {
        title: 'Hiring and mentoring',
        description:
          'Personally hired four mobile engineers and supported teams that grew to as many as three Android and three iOS developers.',
      },
    ],
    leadershipNote:
      'Combined team leadership with approximately 60–80% hands-on engineering, remaining directly involved in architecture, product foundations and complex implementation work.',
  },
] as const satisfies readonly FeaturedCommercialRole[];

export const platformEngineering = {
  intro:
    'Earlier platform roles added experience with AOSP customization, system applications, device-specific UX and production updates for custom Android hardware.',
  entries: [
    {
      product: 'Yandex.Phone',
      role: 'Android platform team',
      description:
        'Worked in a small Android platform team and independently owned development and customization work across SystemUI, the lock screen, notifications, Dialer, Contacts and major parts of the first-run device experience.',
      tags: [
        'AOSP',
        'SystemUI',
        'Lock screen',
        'Notifications',
        'Dialer and Contacts',
        'First-run experience',
      ],
      link: {
        label: 'Product overview',
        url: 'https://yandex.com/company/news/2018-12-05',
        ariaLabel: 'Open the Yandex.Phone product overview in a new tab',
        variant: 'context',
        analyticsData: {
          product: 'yandex-phone',
          destination: 'product-overview',
        },
      },
    },
    {
      product: 'YotaDevices',
      role: 'System applications and device integrations',
      description:
        'Developed Dialer, Contacts, YotaHub, E-Ink widgets and supporting SDK integrations using Binder, AIDL and Java. Delivered production YotaPhone 2 updates, including work on a major Android upgrade, and participated in YotaPhone 3 development.',
      tags: [
        'System apps',
        'E-Ink UX',
        'Binder and AIDL',
        'Java',
        'Production device updates',
        'Android platform upgrade',
      ],
      link: {
        label: 'Product overview',
        url: 'https://www.wired.com/2014/12/yotaphone-2/',
        ariaLabel: 'Open the YotaPhone 2 product overview in a new tab',
        variant: 'context',
        analyticsData: {
          product: 'yotaphone-2',
          destination: 'product-overview',
        },
      },
    },
  ] satisfies readonly PlatformEngineeringEntry[],
} as const;

export const supportingExperience: CompactSupportingExperience = {
  product: 'Raiffeisen',
  role: 'Senior Android Developer · Acting Android Community Lead',
  link: {
    label: 'Google Play',
    url: 'https://play.google.com/store/apps/details?id=ru.raiffeisennews',
    ariaLabel: 'Open Raiffeisen on Google Play in a new tab',
    analyticsData: { product: 'raiffeisen', destination: 'google-play' },
  },
  summary:
    'Developed customer-facing mobile banking functionality as part of the Online Sales team in a multi-module Kotlin application built with RxJava, Dagger and MVP.',
  contributions: [
    {
      title: 'Product development',
      description:
        'Delivered and evolved mobile banking functionality in a large production application used for everyday customer financial operations.',
    },
    {
      title: 'UI testing practice',
      description:
        'Established an app-wide Android UI testing practice using Kaspresso, Kakao and UIAutomator, with reusable abstractions, helpers and rules integrated into CI.',
    },
    {
      title: 'Engineering community',
      description:
        'Served as Acting Android Community Lead, supporting shared engineering practices beyond the immediate product team.',
    },
  ],
};

export const leadership = {
  intro:
    'Across two product leadership roles, I personally hired eight engineers, mentored developers and helped shape architecture and delivery while remaining 60–80% hands-on.',
  facts: [
    { value: '8', label: 'engineers personally hired' },
    { value: '2', label: 'product leadership roles' },
    { value: '60–80%', label: 'hands-on engineering' },
  ] satisfies readonly LeadershipFact[],
  areas: [
    {
      title: 'Team building',
      description:
        'Personally hired eight engineers across TapYou and BCS / BROKSTOCK and helped teams grow around real product needs.',
    },
    {
      title: 'Mentoring and onboarding',
      description:
        'Supported engineers through onboarding, code review, technical feedback and increasing ownership.',
    },
    {
      title: 'Architecture and delivery',
      description:
        'Facilitated collaborative architecture decisions, scoped implementation work and kept technical improvements aligned with product delivery.',
    },
    {
      title: 'Complex hands-on work',
      description:
        'Continued owning difficult media, platform and product-foundation work rather than moving into coordination-only leadership.',
    },
  ] satisfies readonly LeadershipArea[],
} as const;

export const expertiseGroups = [
  {
    title: 'Android and Kotlin',
    items: [
      'Kotlin',
      'Java',
      'Coroutines',
      'Flow',
      'Jetpack Compose',
      'Android Views',
      'Navigation',
      'WorkManager',
      'Notifications',
    ],
  },
  {
    title: 'Architecture and state',
    items: [
      'MVVM',
      'MVI',
      'MVP',
      'Unidirectional data flow',
      'Clean Architecture',
      'Modularization',
      'Dagger and Hilt',
      'Koin',
      'Manual dependency injection',
    ],
  },
  {
    title: 'Data and networking',
    items: [
      'Room',
      'Retrofit',
      'OkHttp',
      'RxJava 2 and 3',
      'WebSockets',
      'Local persistence',
      'REST APIs',
    ],
  },
  {
    title: 'Media and real-time',
    items: [
      'Media3',
      'ExoPlayer',
      'MediaCodec',
      'MediaMuxer',
      'FFmpeg',
      'WebRTC',
      'Audio and video processing',
    ],
  },
  {
    title: 'Multiplatform',
    items: [
      'Kotlin Multiplatform',
      'Compose Multiplatform',
      'Shared ViewModels',
      'Shared navigation',
      'Shared domain workflows',
      'Shared persistence',
      'Native Android and iOS integrations',
    ],
  },
  {
    title: 'Testing and delivery',
    items: [
      'JUnit',
      'MockK',
      'Kaspresso',
      'Kakao',
      'UIAutomator',
      'CI/CD',
      'Code review',
      'Release validation',
      'AI-assisted engineering workflows',
    ],
  },
] as const satisfies readonly ExpertiseGroup[];
