// NAVIGATION
export const NAV_LINKS = [
  { href: '/', key: 'home', label: 'Home' },
  { href: '/', key: 'how_it_work', label: 'How it Works?' },
  { href: '/', key: 'services', label: 'Services' },
  { href: '/', key: 'pricing ', label: 'Pricing ' },
  { href: '/', key: 'contact_us', label: 'Contact Us' },
];

// PRODUCTS SECTION
export const PRODUCTS = [
  {
    id: 1,
    name: 'Yoga Classes',
    price: '$49.99',
    image: '/yoga.jpg',
    description: 'Find balance and inner peace with our expert-led yoga sessions',
    category: 'wellness'
  },
  {
    id: 2, 
    name: 'Art Workshop',
    price: '$79.99',
    image: '/art.jpg',
    description: 'Express your creativity through various art mediums and techniques',
    category: 'creative'
  },
  {
    id: 3,
    name: 'Business Consulting',
    price: '$199.99',
    image: '/consulting.jpg', 
    description: 'Strategic business advice to help your company grow',
    category: 'professional'
  },
  {
    id: 4,
    name: 'Gym Membership',
    price: '$59.99',
    image: '/gym.jpg',
    description: 'Full access to state-of-the-art fitness equipment and facilities',
    category: 'fitness'
  },
  {
    id: 5,
    name: 'Language Course',
    price: '$89.99',
    image: '/language.jpg',
    description: 'Master a new language with our comprehensive learning program',
    category: 'education'
  },
  {
    id: 6,
    name: 'Massage Therapy',
    price: '$69.99',
    image: '/massage.jpg',
    description: 'Relaxing therapeutic massage by certified professionals',
    category: 'wellness'
  },
  {
    id: 7,
    name: 'Piano Lessons',
    price: '$45.99',
    image: '/piano.jpg',
    description: 'Learn piano from basics to advanced with experienced instructors',
    category: 'music'
  }
];

//Footer section
export const FOOTER_LINKS = [
  {
    title: 'Learn More',
    links: [
      'About Us',
      'Press Releases',
      'Environment',
      'Jobs',
      'Privacy Policy',
      'Contact Us',
    ],
  },
  {
    title: 'Our Community',
    links: ['Art-lib', 'Language-learning', 'Yoga-club', 'Consulting-office','Gym-club','Massage-spa','Piano-classes','therapy-sessions'],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: 'Contact Us',
  links: [
    { label: 'Admin Officer', value: '123-456-7890' },
    { label: 'Email Officer', value: 'hilink@akinthil.com' },
  ],
};

export const SOCIALS = {
  title: 'Social',
  links: [
    '/facebook.svg',
    '/instagram.svg',
    '/twitter.png',
    '/youtube.svg',
    '/wordpress.svg',
  ],
};
