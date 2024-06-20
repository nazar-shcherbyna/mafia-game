import RegistrationForm from '@/app/ui/registration-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registration',
};

export default function RegistrationPage() {
  return (
    <div className="flex justify-center">
      <RegistrationForm />
    </div>
  );
}
