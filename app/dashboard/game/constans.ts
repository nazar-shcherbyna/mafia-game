export const GAME_ROLES_KEYS = {
  CIVILIAN: 'CIVILIAN',
  DETECTIVE: 'DETECTIVE',
  DOCTOR: 'DOCTOR',
  MAFIA: 'MAFIA',
  GODFATHER: 'GODFATHER',
  HOOKER: 'HOOKER',
  KILLER: 'KILLER',
} as const;

export const GAME_ROLES = {
  [GAME_ROLES_KEYS.CIVILIAN]: { color: 'bg-gray-200', max: Infinity },
  [GAME_ROLES_KEYS.DETECTIVE]: { color: 'bg-gray-400', max: 1 },
  [GAME_ROLES_KEYS.DOCTOR]: { color: 'bg-lime-400', max: 1 },
  [GAME_ROLES_KEYS.MAFIA]: { color: 'bg-rose-400', max: Infinity },
  [GAME_ROLES_KEYS.GODFATHER]: { color: 'bg-rose-950', max: 1 },
  [GAME_ROLES_KEYS.HOOKER]: { color: 'bg-purple-400', max: 1 }, //Lola
  [GAME_ROLES_KEYS.KILLER]: { color: 'bg-yellow-500', max: 1 }, //Maniak
} as const;

export type GamePlayerStatusType =
  | 'ALIVE'
  | 'CHECKED_BY_DETECTIVE'
  | 'HOOKED'
  | 'KILLED_BY_DAY_VOTE'
  | 'KILLED_BY_MAFIA'
  | 'KILLED_BY_KILLER'
  | 'HILLED';

export const GAME_PLAYER_STATUS = {
  ALIVE: {
    opacity: 'opacity-100',
    maxTime: Infinity,
    maxQuantity: Infinity,
    owners: Object.values(GAME_ROLES_KEYS),
    isNightAction: undefined,
    order: 1,
    isDeadly: false,
  },
  CHECKED_BY_DETECTIVE: {
    opacity: 'opacity-100',
    maxTime: 1,
    maxQuantity: 1,
    owners: [GAME_ROLES_KEYS.DETECTIVE],
    isNightAction: true,
    order: 2,
    isDeadly: false,
  },
  HOOKED: {
    opacity: 'opacity-60',
    maxTime: 1,
    maxQuantity: 1,
    owners: [GAME_ROLES_KEYS.HOOKER],
    isNightAction: true,
    order: 3,
    isDeadly: false,
  },
  KILLED_BY_DAY_VOTE: {
    opacity: 'opacity-10',
    maxTime: Infinity,
    maxQuantity: 1,
    owners: Object.values(GAME_ROLES_KEYS),
    isNightAction: false,
    order: 10,
    isDeadly: true,
  },
  KILLED_BY_MAFIA: {
    opacity: 'opacity-10',
    maxTime: Infinity,
    maxQuantity: 1,
    owners: [GAME_ROLES_KEYS.MAFIA],
    isNightAction: true,
    order: 10,
    isDeadly: true,
  },
  KILLED_BY_KILLER: {
    opacity: 'opacity-10',
    maxTime: Infinity,
    maxQuantity: 1,
    owners: [GAME_ROLES_KEYS.KILLER],
    isNightAction: true,
    order: 10,
    isDeadly: true,
  },
  HILLED: {
    opacity: 'opacity-100',
    maxTime: 1,
    maxQuantity: 1,
    owners: [GAME_ROLES_KEYS.DOCTOR],
    isNightAction: true,
    order: 20,
    isDeadly: false,
  },
} as const;
