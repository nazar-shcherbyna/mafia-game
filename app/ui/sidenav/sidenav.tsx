'use client';

import { useTranslate } from '@/app/providers/TranslationsProvider/provider';
import { PlayerCard } from './components/player-card';
import { PlayerStatistic } from './components/player-statistic';

export default function SideNav() {
  const translate = useTranslate();

  return (
    <div className="flex flex-col gap-6">
      <PlayerCard />
      <PlayerStatistic />
    </div>
  );
}
