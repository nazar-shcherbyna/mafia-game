import { DBUserRolesEnum } from '@/app/@types/db-enums';
import { fetchUser } from '@/app/lib/data';
import { UiBox } from '@/app/ui/atoms/box';
import CreateEventForm from '@/app/ui/create-event-form';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Event',
};

export default async function Page() {
  const session = await auth();
  const user = session ? await fetchUser(session.user.id) : null;

  if (user && user.role === DBUserRolesEnum.admin) {
    return <CreateEventForm adminId={user.id} />;
  }
  return (
    <UiBox>
      <h1>Create Event</h1>
      <p>
        You are not admin or there occured an error while getting your user data
      </p>
    </UiBox>
  );
}
