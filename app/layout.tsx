import '@/app/ui/global.css';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { inter } from './ui/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${inter.className} bg-[#1F2233] text-[#CFD3EC] antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
