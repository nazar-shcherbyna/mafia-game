import Image from 'next/image';
import React from 'react';

export const MainLogo: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <Image
      src="/main-logo.png"
      width={160}
      height={106}
      className={className}
      alt="Main Logo of the project"
    />
  );
};
