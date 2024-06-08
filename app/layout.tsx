import type { LayoutProps } from '@/.next/types/app/layout';
import '@/app/ui/global.css';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { MainLogo } from './ui/atoms/main-logo';
import { inter } from './ui/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s | Mafia Game',
    default: 'Mafia Game',
  },
  description: 'Desktop game for playing Mafia with friends online.',
  authors: {
    name: 'Nazar Shcherbyna',
    url: 'https://www.linkedin.com/in/nazar-shcherbyna/',
  },
  applicationName: 'Mafia Game',
  keywords: ['mafia', 'game', 'online', 'desktop', 'friends'],
  category: 'Games',
  twitter: {
    card: 'summary_large_image',
    site: '@mafia_game',
    description: 'Desktop game for playing Mafia with friends online.',
  },
  openGraph: {
    type: 'website',
    title: 'Mafia Game',
    description: 'Desktop game for playing Mafia with friends online.',
    images: [
      {
        url: 'https://mafia-game.vercel.app/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Mafia Game',
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${inter.className} bg-[#1F2233] text-[#CFD3EC] antialiased`}
      >
        <main className="h-screen">
          <div className="flex w-full justify-center px-6 pb-8 pt-10">
            <MainLogo />
          </div>
          <div className="mt-10">{children}</div>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
