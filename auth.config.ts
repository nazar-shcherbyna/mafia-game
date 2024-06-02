import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnEvents = nextUrl.pathname.startsWith('/events');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isOnEvents) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        if (isOnDashboard) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        if (isOnEvents) {
          return Response.redirect(new URL('/events', nextUrl));
        }

        return Response.redirect(new URL(nextUrl));
      }
      return true;
    },
    session({ session, token }) {
      if (token && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
