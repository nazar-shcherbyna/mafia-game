import { UiBox } from '@/app/ui/atoms/box';
import { UiTable } from '@/app/ui/atoms/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <UiBox className="col-span-4 md:col-span-1">Statistic</UiBox>
      <UiTable className="col-span-4 md:col-span-3" columns={[]} data={[]} />
    </div>
  );
}
