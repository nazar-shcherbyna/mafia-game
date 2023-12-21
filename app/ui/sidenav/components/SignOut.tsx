import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';

export const SidebarSignOut: React.FC = () => {
  return (
    <form
      action={async () => {
        await signOut();
      }}
    >
      <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  );
};
