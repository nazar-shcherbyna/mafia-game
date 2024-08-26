'use server';

import { DBUserType } from '@/app/@types/db-types';
import { signIn } from '@/auth';
import { settings } from '@/settings';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { AuthError } from 'next-auth';
import { z } from 'zod';

const RegistrationFormSchema = z.object({
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
  confirmPassword: z
    .string({
      invalid_type_error: 'Please enter a valid password.',
    })
    .min(settings.password.minLength)
    .max(settings.password.maxLength),
});

export async function registrate(
  prevState: any,
  formData: FormData,
): Promise<
  | {
      errors: Record<string, string[]> | null;
      message: string;
    }
  | undefined
> {
  try {
    const validatedFields = RegistrationFormSchema.safeParse({
      nickname: formData.get('nickname'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Player.',
      };
    }

    if (
      validatedFields.data.password !== validatedFields.data.confirmPassword
    ) {
      return {
        errors: null,
        message: 'Passwords do not match.',
      };
    }

    const isPlayerExists = await checkIfUserNicknameAlreadyExist(
      validatedFields.data.nickname,
    );

    if (isPlayerExists) {
      return {
        errors: null,
        message: 'Player with this nickname already exists.',
      };
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

    await sql`
        INSERT INTO users (nickname, password) 
        VALUES (${validatedFields.data.nickname}, ${hashedPassword})
      `;

    await signIn('credentials', validatedFields.data);
  } catch (error) {
    console.error(`Failed to create user: ${error}`);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            errors: null,
            message: 'Invalid credentials.',
          };
        default:
          return {
            errors: null,
            message: 'Failed to sign in.',
          };
      }
    }
    throw error;
  }
}

async function checkIfUserNicknameAlreadyExist(nickname: string) {
  const player = await sql<
    Pick<DBUserType, 'nickname'>
  >`SELECT nickname FROM users WHERE nickname = ${nickname}`;
  return Boolean(player.rows.length);
}
