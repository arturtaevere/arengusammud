
import { z } from 'zod';

// Validation schemas
export const loginSchema = z.object({
  email: z.string().email('Palun sisesta korrektne e-posti aadress'),
  password: z.string().min(6, 'Parool peab olema vähemalt 6 tähemärki pikk'),
});

export const signupSchema = z.object({
  name: z.string().min(2, 'Nimi peab olema vähemalt 2 tähemärki pikk'),
  email: z.string().email('Palun sisesta korrektne e-posti aadress'),
  password: z.string().min(6, 'Parool peab olema vähemalt 6 tähemärki pikk'),
  role: z.enum(['juht', 'õpetaja']),
  school: z.string().min(1, 'Kooli valik on kohustuslik'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
