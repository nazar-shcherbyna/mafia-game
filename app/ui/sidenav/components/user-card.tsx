import { DBUserType } from '@/app/@types/db-types';
import { UiBox } from '@/app/ui/atoms/box';
import {
  CircleStackIcon,
  GiftIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { SidebarSignOut } from './sign-out';

export const UserCard: React.FC<{ user: DBUserType | null }> = ({ user }) => {
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
            nickname - {user?.nickname}
          </div>
          <LabelWithIconView
            icon={
              <UserCircleIcon
                color="#746BD4"
                width={24}
                height={24}
                className="mr-1 shrink-0"
              />
            }
          >
            Role —{' '}
            <span className="ml-1 uppercase text-yellow-300">{user?.role}</span>
          </LabelWithIconView>
          <LabelWithIconView
            icon={
              <CircleStackIcon
                color="#746BD4"
                width={24}
                height={24}
                className="mr-1 shrink-0"
              />
            }
          >
            Balance — 1000
          </LabelWithIconView>
          <LabelWithIconView
            icon={
              <GiftIcon
                color="#746BD4"
                width={24}
                height={24}
                className="mr-1 shrink-0"
              />
            }
          >
            Free games — 3
          </LabelWithIconView>
        </div>
      </div>
      <div>
        <SidebarSignOut />
      </div>
    </UiBox>
  );
};

function LabelWithIconView({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center text-[14px] leading-[21px]">
      {icon}
      {children}
    </div>
  );
}
