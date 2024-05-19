import { GamesTableAlert } from '@/app/ui/dashboard/alert';
import { GamesTable } from '@/app/ui/dashboard/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-6">
      <GamesTableAlert />
      <GamesTable className="" columns={[]} data={[]} />
    </div>
  );
}
