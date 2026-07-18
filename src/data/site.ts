export const site = {
  name: 'Nikita Glazkov',
  title: 'Senior / Lead Android Engineer',
  location: 'Limassol, Cyprus',
  contact: {
    email: 'biggemott@gmail.com',
    linkedin: {
      url: 'https://linkedin.com/in/nikita-glazkov-3b1019144/',
      label: 'LinkedIn',
      ariaLabel: "Open Nikita Glazkov's LinkedIn profile in a new tab",
    },
    telegram: {
      url: 'https://t.me/Biggemot',
      label: 'Telegram',
      ariaLabel: "Open Nikita Glazkov's Telegram profile in a new tab",
    },
  },
} as const;

export const profile = {
  education: {
    primary: 'Engineer in Microprocessor Electronics',
    secondary: 'National University of Science and Technology MISiS · 2009',
  },
  languages: [
    { name: 'Russian', level: 'Native' },
    { name: 'English', level: 'B2 / Upper-Intermediate' },
  ],
  opportunity: {
    location: 'Limassol, Cyprus',
    hero: 'Open to remote and hybrid opportunities · On-site in Cyprus',
    context:
      'Open to remote and hybrid opportunities, and on-site roles in Cyprus',
    contact:
      'I am based in Limassol, Cyprus and open to Senior / Lead Android opportunities in remote and hybrid teams, as well as on-site roles in Cyprus.',
  },
} as const;

export const navigation = [
  { href: '#about', label: 'About' },
  { href: '#project', label: 'Project' },
  { href: '#experience', label: 'Experience' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#contact', label: 'Contact' },
] as const;

export const metadata = {
  title: 'Nikita Glazkov — Senior / Lead Android Engineer',
  description:
    'Senior / Lead Android Engineer with 13+ years of experience in Kotlin, Jetpack Compose, mobile architecture, Kotlin Multiplatform, fintech, real-time media and AOSP-based systems.',
  openGraphDescription:
    'Hands-on Android engineer and technical leader with experience across Kotlin Multiplatform, fintech, real-time media and Android platform development.',
  canonicalUrl: 'https://biggemott.github.io/',
} as const;
