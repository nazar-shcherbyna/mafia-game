import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="container mx-auto p-5">{children}</main>;
}
