'use server';

import { PlayerType } from '@/app/@types/types';
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
});

export async function registrate(prevState: any, formData: FormData) {
  try {
    const validatedFields = RegistrationFormSchema.safeParse({
      nickname: formData.get('nickname'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Player.',
      };
    }

    const isPlayerExists = await checkIfPlayerExists(
      validatedFields.data.nickname,
    );

    if (isPlayerExists) {
      return 'Player with such nickname already exists.';
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

    await sql`
        INSERT INTO players (nickname, password) 
        VALUES (${validatedFields.data.nickname}, ${hashedPassword})
      `;

    await signIn('credentials', validatedFields.data);
  } catch (error) {
    console.log(`Failed to create player: ${error}`);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

async function checkIfPlayerExists(nickname: string) {
  const player =
    await sql<PlayerType>`SELECT nickname FROM players WHERE nickname = ${nickname}`;
  return Boolean(player.rows.length);
}
