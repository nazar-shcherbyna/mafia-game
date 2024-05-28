import CreateEventForm from '@/app/ui/create-event-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Event',
};

export default function Page() {
  return <CreateEventForm />;
}
