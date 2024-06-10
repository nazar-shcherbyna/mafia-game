'use client';

import React from 'react';
import { UiLink } from '../link';

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
