import CreateGameForm from '@/app/ui/create-game-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Game',
};

export default function Page() {
  return <CreateGameForm />;
}
