import { UiTable } from '@/app/ui/atoms/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <div className="">
      <UiTable className="" columns={[]} data={[]} />
    </div>
  );
}
