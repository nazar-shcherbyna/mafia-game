import {
  DBGamePlayerRoleEnum,
  DBGameRoundPlayerStatusEnum,
} from '@/app/@types/db-enums';
import {
  BanknotesIcon,
  EyeDropperIcon,
  HeartIcon,
  HomeIcon,
  PlusIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

export const GAME_ROLES_DATA: Record<
  DBGamePlayerRoleEnum,
  {
    classes: string;
    max: number;
    icon: React.FC<{
      className?: string;
    }>;
    iconClasses: string;
  }
> = {
  [DBGamePlayerRoleEnum.civilian]: {
    classes: 'bg-[#28C76F]',
    max: Infinity,
    icon: HomeIcon,
    iconClasses: 'h-10 w-10 text-[#FFFFFF]',
  },
  [DBGamePlayerRoleEnum.detective]: {
    classes: 'bg-[#047BFB]',
    max: 1,
    icon: StarIcon,
    iconClasses: 'h-10 w-10 text-[#FFFFFF]',
  },
  [DBGamePlayerRoleEnum.doctor]: {
    classes: 'bg-[#F5F5F5]',
    max: 1,
    icon: PlusIcon,
    iconClasses: 'h-10 w-10 text-[#EA5455]',
  },
  [DBGamePlayerRoleEnum.mafia]: {
    classes: 'bg-[#43454F]',
    max: Infinity,
    icon: BanknotesIcon,
    iconClasses: 'h-10 w-10 text-[#FFFFFF]',
  },
  [DBGamePlayerRoleEnum.don]: {
    classes: 'bg-[#43454F]',
    max: 1,
    icon: BanknotesIcon,
    iconClasses: 'h-10 w-10 text-[#FFFFFF]',
  },
  [DBGamePlayerRoleEnum.hooker]: {
    classes: 'bg-[#E83E8C]',
    max: 1,
    icon: HeartIcon,
    iconClasses: 'h-10 w-10 text-[#FFFFFF]',
  }, //Lola
  [DBGamePlayerRoleEnum.killer]: {
    classes: 'bg-[#C43234]',
    max: 1,
    icon: EyeDropperIcon,
    iconClasses: 'h-10 w-10 text-[#FFFFFF] rotate-180',
  }, //Maniak
} as const;

export const GAME_PLAYER_STATUS: Record<
  DBGameRoundPlayerStatusEnum,
  {
    opacity: string;
    maxTime: number;
    maxQuantity: number;
    owners: DBGamePlayerRoleEnum[];
    isNightAction: boolean | undefined;
    order: number;
    isDeadly: boolean;
  }
> = {
  [DBGameRoundPlayerStatusEnum.alive]: {
    opacity: 'opacity-100',
    maxTime: Infinity,
    maxQuantity: Infinity,
    owners: Object.values(DBGamePlayerRoleEnum),
    isNightAction: undefined,
    order: 1,
    isDeadly: false,
  },
  [DBGameRoundPlayerStatusEnum.checked_by_detective]: {
    opacity: 'opacity-100',
    maxTime: 1,
    maxQuantity: 1,
    owners: [DBGamePlayerRoleEnum.detective],
    isNightAction: true,
    order: 2,
    isDeadly: false,
  },
  [DBGameRoundPlayerStatusEnum.killed_by_detective]: {
    opacity: 'opacity-10',
    maxTime: 1,
    maxQuantity: 1,
    owners: [DBGamePlayerRoleEnum.detective],
    isNightAction: true,
    order: 10,
    isDeadly: true,
  },
  [DBGameRoundPlayerStatusEnum.hooked]: {
    opacity: 'opacity-60',
    maxTime: 1,
    maxQuantity: 1,
    owners: [DBGamePlayerRoleEnum.hooker],
    isNightAction: true,
    order: 3,
    isDeadly: false,
  },
  [DBGameRoundPlayerStatusEnum.killed_by_day_vote]: {
    opacity: 'opacity-10',
    maxTime: Infinity,
    maxQuantity: 1,
    owners: Object.values(DBGamePlayerRoleEnum),
    isNightAction: false,
    order: 10,
    isDeadly: true,
  },
  [DBGameRoundPlayerStatusEnum.killed_by_mafia]: {
    opacity: 'opacity-10',
    maxTime: Infinity,
    maxQuantity: 1,
    owners: [DBGamePlayerRoleEnum.mafia, DBGamePlayerRoleEnum.don],
    isNightAction: true,
    order: 10,
    isDeadly: true,
  },
  [DBGameRoundPlayerStatusEnum.killed_by_killer]: {
    opacity: 'opacity-10',
    maxTime: Infinity,
    maxQuantity: 1,
    owners: [DBGamePlayerRoleEnum.killer],
    isNightAction: true,
    order: 10,
    isDeadly: true,
  },
  [DBGameRoundPlayerStatusEnum.hilled_by_doctor]: {
    opacity: 'opacity-100',
    maxTime: 1,
    maxQuantity: 1,
    owners: [DBGamePlayerRoleEnum.doctor],
    isNightAction: true,
    order: 20,
    isDeadly: false,
  },
};
