import { BellAlertIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { UiBox } from '../atoms/box';
import { UiButton } from '../atoms/button';

export const GamesTableAlert: React.FC = () => {
  return (
    <UiBox className="flex justify-between">
      <div className="flex items-center text-sm font-semibold">
        <BellAlertIcon
          color="#746BD4"
          width={24}
          height={24}
          className="mr-2"
        />
        You can join existing games or create your own game
      </div>
      <div>
        <UiButton className="flex items-center gap-2 px-5 py-2 text-sm font-medium">
          <PlusCircleIcon width={16} height={16} /> Create game
        </UiButton>
      </div>
    </UiBox>
  );
};
