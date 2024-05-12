'use server';

import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { PlayerType } from './app/@types/types';
import { authConfig } from './auth.config';
import { settings } from './settings';

async function getUser(nickname: string): Promise<PlayerType | undefined> {
  try {
    const player =
      await sql<PlayerType>`SELECT nickname, password FROM players WHERE nickname=${nickname}`;
    return player.rows[0];
  } catch (error) {
    console.error('Failed to fetch player:', error);
    throw new Error('Failed to fetch player.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            nickname: z
              .string()
              .min(settings.nickname.minLength)
              .max(settings.nickname.maxLength),
            password: z.string().min(settings.password.minLength),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { nickname, password } = parsedCredentials.data;
          const user = await getUser(nickname);

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
