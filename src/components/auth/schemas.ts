
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
  role: z.enum(['coach', 'teacher']),
  school: z.string().optional(),
}).refine(data => {
  // School is required only for teachers
  return data.role !== 'teacher' || (data.role === 'teacher' && !!data.school);
}, {
  message: "Õpetaja peab valima kooli",
  path: ["school"],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
