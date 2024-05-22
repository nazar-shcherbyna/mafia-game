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
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
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
