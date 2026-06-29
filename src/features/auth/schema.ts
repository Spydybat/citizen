import { z } from 'zod'

const email = z.string().min(1, 'Email is required').email('Enter a valid email address')

const strongPassword = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Include at least one lowercase letter')
  .regex(/[A-Z]/, 'Include at least one uppercase letter')
  .regex(/[0-9]/, 'Include at least one number')

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
    email,
    password: strongPassword,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({ email })

export const resetPasswordSchema = z
  .object({
    password: strongPassword,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
