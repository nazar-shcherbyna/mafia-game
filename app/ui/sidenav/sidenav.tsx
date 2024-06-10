import { DBUserType } from '@/app/@types/db-types';
import { PlayerCard } from './components/player-card';
import { PlayerStatistic } from './components/player-statistic';

export default async function SideNav({ user }: { user: DBUserType | null }) {
  return (
    <div className="flex flex-col gap-6">
      <PlayerCard user={user} />
      {user?.role === 'player' && <PlayerStatistic />}
    </div>
  );
}
