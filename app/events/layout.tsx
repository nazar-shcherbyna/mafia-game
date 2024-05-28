import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex w-full justify-center p-5">
      <Link
        href="/dashboard"
        className="absolute left-10 flex items-center text-xl font-semibold text-[#CFD3EC]"
      >
        <ArrowLeftIcon
          width={24}
          height={24}
          color="#746BD4"
          className="mr-3"
        />
        Back
      </Link>
      {children}
    </div>
  );
}
