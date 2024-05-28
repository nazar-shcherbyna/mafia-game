import { UiBox } from '@/app/ui/atoms/box';
import type { Metadata } from 'next';
import { fetchEvent } from '../../lib/events/create';

export const metadata: Metadata = {
  title: 'Game Number',
};

export default async function Page({ params }: { params: { id: string } }) {
  const event = await fetchEvent(params.id);
  console.log('event', event);

  return (
    <UiBox className="w-[300px] p-10 sm:w-[440px]">
      <div className="mb-4">
        <h3 className="mb-1 text-lg font-semibold text-[#CFD3EC]">
          Event name
        </h3>
        <p className="text-lg font-normal text-[#746BD4]">{event.title}</p>
      </div>
      <div className="mb-4">
        <h3 className="mb-1 text-lg font-semibold text-[#CFD3EC]">
          Date & Time
        </h3>
        <p className="text-lg font-normal text-[#746BD4]">
          {event.date.toLocaleString()}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="mb-1 text-lg font-semibold text-[#CFD3EC]">Location</h3>
        <p className="text-lg font-normal text-[#746BD4]">{event.location}</p>
      </div>
    </UiBox>
  );
}
