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
