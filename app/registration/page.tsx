import { Metadata } from 'next';
import RegistrationForm from '../ui/registration-form';

export const metadata: Metadata = {
  title: 'Registration',
};

export default function RegistrationPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <RegistrationForm />
    </main>
  );
}
