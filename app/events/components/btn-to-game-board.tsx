'use client';

import { UiLink } from '@/app/ui/link';
import React from 'react';

export const BtnToGameBoard: React.FC<{
  className?: string;
  eventId: string;
}> = ({ className, eventId }) => {
  return (
    <UiLink href={`/events/${eventId}/game-board`} className={className}>
      To game board
    </UiLink>
  );
};
