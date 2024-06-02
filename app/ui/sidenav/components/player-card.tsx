import { UserType } from '@/app/@types/users';
import { CircleStackIcon, GiftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { UiBox } from '../../atoms/box';
import { SidebarSignOut } from './sign-out';

export const PlayerCard: React.FC<{ user: UserType | null }> = ({ user }) => {
  return (
    <UiBox>
      <div className="mb-[16px] flex gap-5 border-b-[1px] border-[#68709B] pb-[16px]">
        <div>
          <Image
            className="rounded-full"
            width={90}
            height={90}
            src="/dev-avatar.png"
            alt="player-avatar"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[22px] leading-8">
            {user?.nickname} - {JSON.stringify(user)}
          </div>
          <div className="flex items-center text-[14px] leading-[21px]">
            <CircleStackIcon
              color="#746BD4"
              width={24}
              height={24}
              className="mr-1 shrink-0"
            />
            Balance — 1000
          </div>
          <div className="flex items-center text-[14px] leading-[21px]">
            <GiftIcon
              color="#746BD4"
              width={24}
              height={24}
              className="mr-1 shrink-0"
            />
            Free games — 3
          </div>
        </div>
      </div>
      <div>
        <SidebarSignOut />
      </div>
    </UiBox>
  );
};
