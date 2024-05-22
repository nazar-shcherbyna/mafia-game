import { signOut } from '@/auth';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { UiButton } from '../../atoms/button';

export const SidebarSignOut: React.FC = () => {
  return (
    <form
      action={async () => {
        await signOut();
      }}
    >
      <UiButton
        className="flex items-center rounded-md border-[1px] border-[#746BD4]
        bg-[#E3E1FC] px-5 py-2 text-sm font-medium
        !text-[#746BD4] hover:text-white focus:text-white active:text-white"
        type="submit"
      >
        <ArrowRightOnRectangleIcon
          color="#746BD4"
          width={16}
          height={16}
          className="mr-2 shrink-0"
        />
        Sign Out
      </UiButton>
    </form>
  );
};
