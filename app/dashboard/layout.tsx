import React from 'react';
import { MainLogo } from '../ui/atoms/main-logo';
import SideNav from '../ui/sidenav/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex w-full justify-center px-6 pb-8 pt-10">
        <MainLogo />
      </div>
      <div className="flex h-screen flex-col p-6 lg:flex-row lg:overflow-hidden">
        <div className="w-full flex-none pb-6 lg:w-1/3">
          <SideNav />
        </div>
        <div className="flex-grow pl-0 lg:overflow-y-auto lg:pl-6">
          {children}
        </div>
      </div>
    </div>
  );
}
