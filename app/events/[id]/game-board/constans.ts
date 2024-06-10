import {
  DBGamePlayerRoleEnum,
  DBGameRoundPlayerStatusEnum,
} from '@/app/@types/db-enums';

export const GAME_ROLES: Record<
  DBGamePlayerRoleEnum,
  {
    color: string;
    max: number;
  }
> = {
  [DBGamePlayerRoleEnum.civilian]: { color: 'bg-gray-200', max: Infinity },
  [DBGamePlayerRoleEnum.detective]: { color: 'bg-gray-400', max: 1 },
  [DBGamePlayerRoleEnum.doctor]: { color: 'bg-lime-400', max: 1 },
  [DBGamePlayerRoleEnum.mafia]: { color: 'bg-rose-400', max: Infinity },
  [DBGamePlayerRoleEnum.don]: { color: 'bg-rose-950', max: 1 },
  [DBGamePlayerRoleEnum.hooker]: { color: 'bg-purple-400', max: 1 }, //Lola
  [DBGamePlayerRoleEnum.killer]: { color: 'bg-yellow-500', max: 1 }, //Maniak
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
} as const;
