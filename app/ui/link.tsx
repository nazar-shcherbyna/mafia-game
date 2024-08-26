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
        `rounded-md 
          bg-[#746BD4] p-2 px-4
          text-sm font-medium text-white outline-none
          hover:bg-[#ABA4F6]
          focus:bg-[#5C52C0] 
          active:bg-[#5C52C0] 
          aria-disabled:cursor-not-allowed aria-disabled:opacity-50`,
        className,
      )}
    >
      {children}
    </Link>
  );
}
