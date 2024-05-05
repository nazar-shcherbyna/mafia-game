import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React from 'react';

interface UiLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function UiLink({ children, className, ...rest }: UiLinkProps) {
  return (
    <Link
      {...rest}
      className={clsx(
        'inline-flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </Link>
  );
}
