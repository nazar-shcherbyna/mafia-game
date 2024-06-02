import { UserType } from '@/app/@types/users';
import { PlayerCard } from './components/player-card';
import { PlayerStatistic } from './components/player-statistic';

export default async function SideNav({ user }: { user: UserType | null }) {
  return (
    <div className="flex flex-col gap-6">
      <PlayerCard user={user} />
      {user?.role === 'player' && <PlayerStatistic />}
    </div>
  );
}
