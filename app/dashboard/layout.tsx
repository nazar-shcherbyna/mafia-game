import React from 'react';
import { MainLogo } from '../ui/atoms/main-logo';
import SideNav from '../ui/sidenav/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <div className="flex w-full justify-center px-6 pb-8 pt-10">
        <MainLogo />
      </div>
      <div className="flex-none p-6 lg:flex">
        <div className="w-full pb-6 lg:w-1/3">
          <SideNav />
        </div>
        <div className="flex-grow pl-0 lg:w-2/3 lg:overflow-y-auto lg:pl-6">
          {children}
        </div>
      </div>
    </div>
  );
}
