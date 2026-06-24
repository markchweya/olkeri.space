export type LegalBlock = {
  heading?: string
  body?: string[]
  bullets?: string[]
}

export type LegalPageContent = {
  slug: string
  title: string
  effectiveDate: string
  intro?: string[]
  blocks: LegalBlock[]
}

const contactBlock: LegalBlock = {
  heading: 'Contact',
  body: ['Olkeri Space', 'Website: olkeri.space'],
  bullets: ['Email: chweyahub@gmail.com'],
}

export const legalPages: Record<string, LegalPageContent> = {
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    effectiveDate: 'June 24, 2026',
    intro: [
      'Welcome to Olkeri Space ("we," "our," or "us"), accessible at olkeri.space.',
      'Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website and interact with our services.',
      'By using our website, you agree to the practices described in this Privacy Policy.',
    ],
    blocks: [
      { heading: 'Information We Collect', body: ['We may collect information that you voluntarily provide, including:'], bullets: ['Name', 'Email address', 'Contact details', 'Newsletter subscriptions', 'Information submitted through contact forms'] },
      { heading: 'Automatically Collected Information', body: ['We may automatically collect:'], bullets: ['IP address', 'Browser type', 'Device information', 'Operating system', 'Pages viewed', 'Referral sources', 'Session duration', 'General geographic location'] },
      { heading: 'How We Use Information', body: ['We may use collected information to:'], bullets: ['Deliver newsletters', 'Respond to inquiries', 'Improve website functionality', 'Analyze website traffic', 'Personalize content', 'Detect abuse or fraud', 'Comply with legal obligations'] },
      { heading: 'Newsletter Subscriptions', body: ['When you subscribe to our newsletter, we may send AI news updates, industry insights, product announcements, new blog articles, and company updates.', 'You may unsubscribe at any time using the unsubscribe link provided in our emails.'] },
      { heading: 'Cookies and Tracking Technologies', body: ['We use cookies and similar technologies to improve website performance, remember user preferences, analyze traffic, and deliver advertising.', 'Users can control cookies through browser settings.'] },
      { heading: 'Google AdSense', body: ['We may display advertisements through Google AdSense and other advertising networks.', 'Third-party vendors, including Google, may use cookies to serve ads based on a user\'s prior visits to this website and other websites.', 'Google\'s use of advertising cookies enables it and its partners to serve personalized advertisements. Users may manage advertising preferences through Google\'s Ad Settings.'] },
      { heading: 'Analytics', body: ['We may use analytics services such as Google Analytics to understand website usage and improve our services.'] },
      { heading: 'Third-Party Links', body: ['Our website may contain links to third-party websites. We are not responsible for their content or privacy practices.'] },
      { heading: 'Embedded Content', body: ['Articles may include videos, images, social media posts, and interactive widgets.', 'Embedded content may collect information according to the policies of the third-party provider.'] },
      { heading: 'Data Security', body: ['We implement reasonable safeguards to protect information. However, no method of transmission over the internet can be guaranteed to be completely secure.'] },
      { heading: 'Children\'s Privacy', body: ['Our website is not directed at children under 13 years of age.', 'We do not knowingly collect personal information from children under 13.'] },
      { heading: 'AI Content Disclaimer', body: ['Olkeri Space publishes news, reviews, analysis, and educational content relating to artificial intelligence.', 'Information may become outdated and should not be relied upon as professional advice.'] },
      { heading: 'Changes to This Policy', body: ['We may update this Privacy Policy periodically. Updates will be published on this page.'] },
      contactBlock,
    ],
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    effectiveDate: 'June 24, 2026',
    intro: ['By accessing and using olkeri.space, you agree to these Terms and Conditions.'],
    blocks: [
      { heading: 'Website Use', body: ['You agree to use the website lawfully and responsibly.', 'You may not:'], bullets: ['Violate laws', 'Distribute malware', 'Attempt unauthorized access', 'Scrape content without permission', 'Disrupt website operations'] },
      { heading: 'Intellectual Property', body: ['Unless otherwise stated, all content published on Olkeri Space belongs to Olkeri Space and is protected by intellectual property laws.', 'You may read content and share article links. You may not republish articles without permission, reproduce substantial portions of content, or sell or redistribute our content.'] },
      { heading: 'Third-Party References', body: ['We may discuss or review third-party companies, products, and services. All trademarks remain the property of their respective owners.'] },
      { heading: 'User Contributions', body: ['Comments and submissions may be removed if unlawful, abusive, misleading, or harmful.'] },
      { heading: 'Newsletter Services', body: ['Users who subscribe may receive updates regarding artificial intelligence, technology, product launches, and website announcements.'] },
      { heading: 'Limitation of Liability', body: ['Olkeri Space shall not be liable for damages arising from use of the website, reliance on content, errors or omissions, or service interruptions.'] },
      { heading: 'External Websites', body: ['We are not responsible for third-party websites linked from our platform.'] },
      { heading: 'Changes', body: ['These terms may be updated periodically.'] },
      contactBlock,
    ],
  },
  'cookie-policy': {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    effectiveDate: 'June 24, 2026',
    blocks: [
      { heading: 'What Are Cookies?', body: ['Cookies are small files stored on your device to improve website functionality and user experience.'] },
      { heading: 'Cookies We Use', body: ['Essential cookies support security, session management, and website functionality.', 'Analytics cookies measure page views, traffic sources, and user engagement.', 'Advertising cookies may be used by Google AdSense and advertising partners to personalize advertisements and measure performance.', 'Functional cookies remember preferences and settings.'] },
      { heading: 'Managing Cookies', body: ['You can block or delete cookies through your browser settings. Disabling cookies may affect certain website features.'] },
      { heading: 'Third-Party Cookies', body: ['Third-party services may place cookies on your device, including Google, YouTube, social media platforms, and analytics providers.'] },
      contactBlock,
    ],
  },
  disclaimer: {
    slug: 'Disclaimer',
    title: 'Disclaimer',
    effectiveDate: 'June 24, 2026',
    intro: ['The information provided on olkeri.space is for informational and educational purposes only.'],
    blocks: [
      { heading: 'News Coverage', body: ['We publish news, reviews, analysis, and commentary regarding artificial intelligence and technology.', 'Information may become outdated after publication.'] },
      { heading: 'No Professional Advice', body: ['Nothing on this website constitutes legal advice, financial advice, investment advice, tax advice, or business advice.', 'Consult qualified professionals where appropriate.'] },
      { heading: 'Reviews and Opinions', body: ['Opinions belong to the authors and contributors. Experiences with products and services may vary.'] },
      { heading: 'Affiliate Disclosure', body: ['We may earn commissions through affiliate programs or advertising. Compensation does not influence editorial decisions.'] },
      { heading: 'External Links', body: ['We are not responsible for third-party websites or services.'] },
      { heading: 'Limitation of Liability', body: ['Use of this website is at your own risk. Olkeri Space shall not be liable for losses arising from use of this website.'] },
      contactBlock,
    ],
  },
  'editorial-policy': {
    slug: 'editorial-policy',
    title: 'Editorial Policy',
    effectiveDate: 'June 24, 2026',
    intro: ['At Olkeri Space, our mission is to provide accurate, insightful, and trustworthy coverage of artificial intelligence, technology, innovation, and digital transformation.'],
    blocks: [
      { heading: 'Editorial Independence', body: ['Our editorial decisions are made independently.', 'Advertising relationships, affiliate partnerships, sponsorships, or business relationships do not influence our reporting.'] },
      { heading: 'Accuracy', body: ['We strive to verify facts before publication, use credible sources, attribute information appropriately, and correct inaccuracies when discovered.'] },
      { heading: 'Sources', body: ['We prioritize official company announcements, regulatory filings, research papers, public documentation, first-party statements, and interviews.'] },
      { heading: 'Corrections', body: ['If factual errors are identified, we will update articles and correct inaccuracies promptly.', 'Readers may report errors by contacting chweyahub@gmail.com.'] },
      { heading: 'Reviews', body: ['Product reviews reflect the opinions of our editorial team based on available information and testing where possible.'] },
      { heading: 'AI Coverage', body: ['Artificial intelligence evolves rapidly. Coverage may include AI models, AI products, AI companies, AI regulations, research developments, and industry analysis.', 'We aim to distinguish clearly between facts, opinions, speculation, and analysis.'] },
      { heading: 'Sponsored Content', body: ['Sponsored content will be clearly labeled.'] },
      contactBlock,
    ],
  },
  'dmca-copyright-policy': {
    slug: 'dmca-copyright-policy',
    title: 'DMCA / Copyright Policy',
    effectiveDate: 'June 24, 2026',
    intro: ['Olkeri Space respects the intellectual property rights of others and expects users and contributors to do the same.'],
    blocks: [
      { heading: 'Copyright Ownership', body: ['Unless otherwise stated, content published on olkeri.space is owned by Olkeri Space and protected by applicable copyright laws.'] },
      { heading: 'Permitted Use', body: ['Users may share article links and quote limited portions with proper attribution.', 'Users may not reproduce entire articles, republish content without permission, or sell or redistribute content.'] },
      { heading: 'Copyright Infringement Claims', body: ['If you believe content published on Olkeri Space infringes your copyright, please provide your name and contact information, identification of the copyrighted work, identification of the allegedly infringing material, a statement that you believe the use is unauthorized, and a statement that the information provided is accurate.', 'Send notices to chweyahub@gmail.com with the subject "Copyright Infringement Notice."'] },
      { heading: 'Removal Process', body: ['Upon receipt of a valid copyright complaint, we may investigate the claim, remove or restrict access to the material, contact the parties involved, and take appropriate action under applicable copyright laws.'] },
      { heading: 'Repeat Infringers', body: ['We reserve the right to restrict access to users who repeatedly violate intellectual property rights.'] },
      contactBlock,
    ],
  },
}

export const legalNavItems = [
  { href: '/privacy-policy', label: 'Privacy' },
  { href: '/terms-and-conditions', label: 'Terms' },
  { href: '/cookie-policy', label: 'Cookies' },
  { href: '/Disclaimer', label: 'Disclaimer' },
  { href: '/editorial-policy', label: 'Editorial' },
  { href: '/dmca-copyright-policy', label: 'DMCA' },
]
