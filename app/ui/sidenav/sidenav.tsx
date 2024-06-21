import { DBUserRolesEnum } from '@/app/@types/db-enums';
import { DBUserType } from '@/app/@types/db-types';
import { PlayerStatistic } from '@/app/ui/sidenav/components/player-statistic';
import { UserCard } from '@/app/ui/sidenav/components/user-card';

export default async function SideNav({ user }: { user: DBUserType | null }) {
  return (
    <div className="flex flex-col gap-6">
      <UserCard user={user} />
      {user?.role === DBUserRolesEnum.player && <PlayerStatistic />}
    </div>
  );
}
