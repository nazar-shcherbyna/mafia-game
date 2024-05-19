'use client';

import { useTranslate } from '@/app/providers/TranslationsProvider/provider';
import { PlayerCard } from './components/PlayerCard';
import { PlayerStatistic } from './components/PlayerStatistic';

export default function SideNav() {
  const translate = useTranslate();

  return (
    <div className="flex flex-col gap-6">
      <PlayerCard />
      <PlayerStatistic />
    </div>
  );
}
