'use server';

import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { z } from 'zod';

const RegistrationFormSchema = z.object({
  nickname: z
    .string({
      invalid_type_error: 'Please enter a valid nickname.',
    })
    .min(3)
    .max(20),
  password: z
    .string({
      invalid_type_error: 'Please enter a valid password.',
    })
    .min(6)
    .max(10),
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

    await sql`
        INSERT INTO players (nickname, password) 
        VALUES (${validatedFields.data.nickname}, ${validatedFields.data.password})
      `;
    const player =
      await sql`SELECT nikname, password FROM players WHERE nickname = ${validatedFields.data.nickname}`;
    alert(`Player ${player} created!`);
  } catch (error) {
    alert(`Failed to create player: ${error}`);
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
