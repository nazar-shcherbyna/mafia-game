import { EventsTableAlert } from '@/app/ui/dashboard/alert';
import { GamesTable } from '@/app/ui/dashboard/table';
import SideNav from '@/app/ui/sidenav/sidenav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <>
      <div className="w-full pb-6 lg:w-1/3">
        <SideNav />
      </div>
      <div className="flex-grow pl-0 lg:w-2/3 lg:overflow-y-auto lg:pl-6">
        <div className="flex flex-col gap-6">
          <EventsTableAlert />
          <GamesTable className="" columns={[]} data={[]} />
        </div>
      </div>
    </>
  );
}
