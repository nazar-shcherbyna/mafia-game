'use server';

import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { DBUserType } from './app/@types/db-types';
import { authConfig } from './auth.config';
import { settings } from './settings';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DBUserType;
  }
}

async function getUser(nickname: string): Promise<DBUserType | undefined> {
  try {
    const player =
      await sql<DBUserType>`SELECT * FROM users WHERE nickname=${nickname} LIMIT 1`;
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
            password: z
              .string()
              .min(settings.password.minLength)
              .max(settings.password.maxLength),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { nickname, password } = parsedCredentials.data;
          const user = await getUser(nickname);

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch)
            return {
              ...user,
              name: user.nickname,
              id: user.id,
            };
        }

        return null;
      },
      credentials: {
        nickname: { label: 'Nickname', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
    }),
  ],
});
