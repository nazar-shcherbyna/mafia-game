import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex-none p-6 lg:flex">{children}</div>;
}
