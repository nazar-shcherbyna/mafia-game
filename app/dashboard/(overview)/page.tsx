import { fetchUser } from '@/app/lib/data';
import { EventsTableAlert } from '@/app/ui/dashboard/alert';
import EventsTable from '@/app/ui/dashboard/events-table';
import SideNav from '@/app/ui/sidenav/sidenav';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const session = await auth();

  const user = session ? await fetchUser(session.user.id) : null;

  if (user == null) {
    return <div>Not found</div>;
  }

  return (
    <>
      <div className="w-full pb-6 lg:w-1/3">
        <SideNav user={user} />
      </div>
      <div className="flex-grow pl-0 lg:w-2/3 lg:overflow-y-auto lg:pl-6">
        <div className="flex flex-col gap-6">
          <EventsTableAlert user={user} />
          <Suspense fallback={<div>Loading...</div>}>
            <EventsTable />
          </Suspense>
        </div>
      </div>
    </>
  );
}
