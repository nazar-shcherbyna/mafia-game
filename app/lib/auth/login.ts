'use server';

import { signIn } from '@/auth';
import { settings } from '@/settings';
import { AuthError } from 'next-auth';
import { z } from 'zod';

const LoginFormSchema = z.object({
  nickname: z
    .string({
      invalid_type_error: 'Please enter a valid nickname.',
    })
    .min(settings.nickname.minLength)
    .max(settings.nickname.maxLength),
  password: z
    .string({
      invalid_type_error: 'Please enter a valid password.',
    })
    .min(settings.password.minLength)
    .max(settings.password.maxLength),
});

export async function login(
  prevState: any,
  formData: FormData,
): Promise<
  | {
      errors: Record<string, string[]>;
      message: string;
    }
  | undefined
> {
  try {
    const validatedFields = LoginFormSchema.safeParse({
      nickname: formData.get('nickname'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Player.',
      };
    }

    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            errors: {},
            message: 'Invalid credentials.',
          };
        default:
          return {
            errors: {},
            message: 'Failed to sign in.',
          };
      }
    }
    throw error;
  }
}
