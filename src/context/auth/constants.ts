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

// Initial user - only keeping Artur
export const INITIAL_USERS = [
  {
    id: '3',
    name: 'Artur',
    email: 'artur@arengusammud.ee',
    password: 'password',
    role: 'juht' as const,
    profileImage: '/lovable-uploads/6eae274c-d643-4822-ae8c-ba2410af6f2a.png',
    school: 'Arengusammud',
    createdAt: new Date(2023, 6, 10).toISOString(),
    emailVerified: true,
  }
];
