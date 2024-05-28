import { BellAlertIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { UiBox } from '../atoms/box';
import { UiLink } from '../link';

export const EventsTableAlert: React.FC = () => {
  return (
    <UiBox className="flex justify-between">
      <div className="flex items-center pr-1 text-sm font-semibold">
        <BellAlertIcon
          color="#746BD4"
          width={24}
          height={24}
          className="mr-2 shrink-0"
        />
        You can join existing events or create your own
      </div>
      <div>
        <UiLink
          href="/events/create"
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium"
        >
          <PlusCircleIcon className="shrink-0" width={16} height={16} />
          New event
        </UiLink>
      </div>
    </UiBox>
  );
};
