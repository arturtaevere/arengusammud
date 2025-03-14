
// Local storage keys
export const USERS_STORAGE_KEY = 'arengusammud_users';
export const USER_STORAGE_KEY = 'user';
export const VERIFICATION_TOKENS_KEY = 'verification_tokens';

// List of available schools
export const SCHOOLS = [
  'Arengusammud',
  'Järveküla Kool',
  'Kilingi-Nõmme Gümnaasium',
  'Tartu Kesklinna Kool',
  'Tallinna Reaalkool',
  'Pärnu Koidula Gümnaasium',
];

// Initial test users
export const INITIAL_USERS = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'coach@example.com',
    password: 'password',
    role: 'coach' as const,
    profileImage: '/lovable-uploads/6eae274c-d643-4822-ae8c-ba2410af6f2a.png',
    school: 'Arengusammud',
    createdAt: new Date(2023, 4, 15).toISOString(),
    emailVerified: true,
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'teacher@example.com',
    password: 'password',
    role: 'teacher' as const,
    school: 'Järveküla Kool',
    createdAt: new Date(2023, 5, 20).toISOString(),
    emailVerified: true,
  },
  {
    id: '3',
    name: 'Artur',
    email: 'artur@arengusammud.ee',
    password: 'password',
    role: 'coach' as const,
    profileImage: '/lovable-uploads/6eae274c-d643-4822-ae8c-ba2410af6f2a.png',
    school: 'Arengusammud',
    createdAt: new Date(2023, 6, 10).toISOString(),
    emailVerified: true,
  },
  {
    id: '4',
    name: 'Maarja Raud',
    email: 'maarja@kesklinnakool.ee',
    password: 'password',
    role: 'teacher' as const,
    school: 'Tartu Kesklinna Kool',
    createdAt: new Date(2023, 7, 5).toISOString(),
    emailVerified: true,
  },
  {
    id: '5',
    name: 'Tiit Mets',
    email: 'tiit@reaalkool.ee',
    password: 'password',
    role: 'teacher' as const,
    school: 'Tallinna Reaalkool',
    createdAt: new Date(2023, 8, 12).toISOString(),
    emailVerified: true,
  },
];
