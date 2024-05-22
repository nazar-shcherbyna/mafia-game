import { GAME_PLAYER_STATUS, GAME_ROLES } from '@/app/dashboard/game/constans';

export type GamePlayerStatusKeysType = keyof typeof GAME_PLAYER_STATUS;
export type GamePlayerRolesKeysType = keyof typeof GAME_ROLES;

export interface PlayerGameInterface {
  role: GamePlayerRolesKeysType;
  sitPlace: number;
  status: GamePlayerStatusKeysType;
  actions: GamePlayerStatusKeysType[];
}

export type PlayerGameDictType = { [id: string]: PlayerGameInterface };

export interface RoundReportInterface extends PlayerGameInterface {
  nickname: string;
}
