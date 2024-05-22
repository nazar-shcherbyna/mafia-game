import { Metadata } from 'next';
import RegistrationForm from '../ui/registration-form';

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
