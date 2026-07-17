import type { cyprusImageAssets } from './cyprus-assets';

type CyprusImageKey = keyof typeof cyprusImageAssets;

interface FlowStep {
  number: string;
  title: string;
  description: string;
  image: CyprusImageKey;
  alt: string;
}

interface PersonalizationOutcome {
  label: string;
  image: CyprusImageKey;
  alt: string;
}

interface ProductImageExample {
  label: string;
  image: CyprusImageKey;
  alt: string;
  lang?: string;
}

interface NativePlatformBoundary {
  label: string;
  description: string;
}

interface CompletenessExample {
  title: string;
  description: string;
  image: CyprusImageKey;
  alt: string;
}

export const featuredProject = {
  name: 'Cyprus Step-by-Step',
  technology:
    'Kotlin Multiplatform · Compose Multiplatform · AI-assisted engineering',
  description:
    'Cyprus Step-by-Step turns complex administrative and everyday processes in Cyprus into clear guided procedures and checklists adapted to each user’s situation.',
  audience:
    'Designed primarily for expatriates, international professionals and families moving to or living in Cyprus.',
  scope:
    'The first release covers eight areas of life in Cyprus, including relocation, transport, taxation, healthcare, housing, family, work and everyday life.',
  ownership:
    'Independently taken from product concept and domain research to Kotlin Multiplatform development, testing and Google Play submission.',
  metrics: [
    ['18', 'guided procedures'],
    ['209', 'actionable steps'],
    ['3', 'languages'],
    ['55', 'source links'],
  ],
} as const;

export const productExperience = {
  problem: {
    label: 'The problem',
    copy: 'Information about administrative and everyday procedures in Cyprus is scattered across government websites, service providers, community discussions and informational resources.\n\nPeople often have to determine which requirements apply to their situation, in what order actions should be completed and where to find the relevant supporting information.',
  },
  solution: {
    label: 'The solution',
    copy: 'Cyprus Step-by-Step organizes this information into structured guided procedures.\n\nUsers answer a short set of relevant questions and receive an actionable checklist adapted to their circumstances, with progress tracking, reminders and direct links to supporting sources.',
  },
  flow: {
    title: 'From a complex procedure to a personal checklist',
    description:
      'Choose a procedure, answer a short questionnaire and receive a checklist tailored to your situation.',
    steps: [
      {
        number: '01',
        title: 'Choose a procedure',
        description: 'Browse or search for the process you need to complete.',
        image: 'flowScenarioOverview',
        alt: 'Buy a used car procedure overview in Cyprus Step-by-Step.',
      },
      {
        number: '02',
        title: 'Answer relevant questions',
        description:
          'Provide only the details needed to determine which guidance applies.',
        image: 'flowQuestionnaireSelected',
        alt: 'Buy a used car questionnaire with an answer selected.',
      },
      {
        number: '03',
        title: 'Follow your checklist',
        description:
          'Work through the generated steps, track progress and return when needed.',
        image: 'flowGeneratedChecklist',
        alt: 'Personalized Buy a used car checklist generated from the questionnaire answers.',
      },
    ] satisfies readonly FlowStep[],
  },
  capabilities: [
    {
      title: 'Adaptive guidance',
      description:
        'Questionnaire answers determine which instructions and requirements appear.',
    },
    {
      title: 'Persistent progress',
      description:
        'Users can leave a procedure and continue later without losing completed steps.',
    },
    {
      title: 'Local reminders',
      description:
        'Important steps can be scheduled locally without requiring an account.',
    },
    {
      title: 'Supporting sources',
      description:
        'Relevant source links remain available alongside the instructions.',
    },
  ],
} as const;

export const personalization = {
  intro:
    'The same procedure can generate different checklists depending on the user’s answers.',
  explanation:
    'Instead of maintaining a separately hardcoded flow for every possible situation, the app evaluates shared content rules and produces the relevant ordered steps for each user.',
  outcomes: [
    {
      label: '9-step outcome',
      image: 'personalization09Steps',
      alt: 'A 9-step checklist outcome for the First steps after arrival procedure.',
    },
    {
      label: '12-step outcome',
      image: 'personalization12Steps',
      alt: 'A 12-step checklist outcome for the same First steps after arrival procedure.',
    },
  ] satisfies readonly PersonalizationOutcome[],
  caption:
    'The same First steps after arrival procedure produces different guidance for different answers.',
  metrics: [
    ['51', 'questionnaire questions'],
    ['177', 'atomic branching conditions'],
    ['114', 'conditional steps'],
    ['682', 'distinct checklist outcomes'],
  ],
  supportingLine:
    'A shared data-driven rules model keeps outcomes deterministic while allowing new procedures to be added as structured content.',
} as const;

export const crossPlatformLocalization = {
  intro:
    'Cyprus Step-by-Step is built with Kotlin Multiplatform and Compose Multiplatform, allowing most of the product experience and application logic to be shared while native integrations remain isolated behind clear platform boundaries.',
  strategy:
    'The product strategy prioritizes the Android release while preserving a practical iOS path without rebuilding the product as a separate codebase.',
  sharedAreas: [
    'Compose UI',
    'Navigation and ViewModels',
    'Application state and workflows',
    'Scenario and personalization engine',
    'Localization and persistence',
  ],
  nativeBoundaries: [
    {
      label: 'Android',
      description:
        'WorkManager reminders, notifications and application file storage.',
    },
    {
      label: 'iOS',
      description:
        'SwiftUI application shell, UserNotifications and Application Support storage.',
    },
  ] satisfies readonly NativePlatformBoundary[],
  validationNote:
    'The shared iOS target has been validated in the simulator across UI, navigation, local storage and reminder workflows.',
  platformExamples: [
    {
      label: 'Android',
      image: 'homeAndroidEn',
      alt: 'Cyprus Step-by-Step home screen running on Android in English.',
    },
    {
      label: 'iOS',
      image: 'homeIosEn',
      alt: 'Cyprus Step-by-Step home screen running in the native iOS application shell.',
    },
  ] satisfies readonly ProductImageExample[],
  platformCaption:
    'The same shared product state presented through Android and iOS application shells.',
  localization: {
    intro:
      'The complete interface and all 18 guided procedures are available in English, Russian and Greek.',
    supportingCopy:
      'Shared resources, structured content and validation rules keep navigation, procedure content and generated checklists aligned across languages.',
    examples: [
      {
        label: 'English',
        image: 'homeAndroidEn',
        alt: 'Cyprus Step-by-Step home screen localized in English.',
      },
      {
        label: 'Русский',
        lang: 'ru',
        image: 'homeAndroidRu',
        alt: 'Cyprus Step-by-Step home screen localized in Russian.',
      },
      {
        label: 'Ελληνικά',
        lang: 'el',
        image: 'homeAndroidEl',
        alt: 'Cyprus Step-by-Step home screen localized in Greek.',
      },
    ] satisfies readonly ProductImageExample[],
    caption: 'The same product state across English, Russian and Greek.',
  },
} as const;

export const productCompleteness = {
  intro:
    'Many administrative and everyday procedures take days or weeks to complete. The app supports multiple active scenarios, persistent progress, search and local reminders so users can continue when the next action becomes relevant.',
  examples: [
    {
      title: 'Find the right guidance',
      description:
        'Search helps users locate relevant procedures and individual guidance without browsing every category.',
      image: 'featureSearchResults',
      alt: 'Search results for procedures and guidance in Cyprus Step-by-Step.',
    },
    {
      title: 'Continue and complete procedures',
      description:
        'Checklist state is preserved locally so users can resume work and clearly see completed procedures.',
      image: 'featureCompletedChecklist',
      alt: 'A completed guided checklist in Cyprus Step-by-Step.',
    },
    {
      title: 'Return at the right time',
      description:
        'Local reminders bring users back to time-sensitive steps without requiring registration or a remote account.',
      image: 'featureScheduledReminder',
      alt: 'A scheduled local reminder for a checklist step in Cyprus Step-by-Step.',
    },
  ] satisfies readonly CompletenessExample[],
  supportingLine:
    'Search, persistent progress and local reminders support procedures that may span multiple sessions.',
} as const;
