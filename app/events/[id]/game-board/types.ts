import {
  DBGamePlayerRoleEnum,
  DBGameRoundPlayerStatusEnum,
} from '@/app/@types/db-enums';
import { GAME_ROLES } from '@/app/dashboard/game/constans';

export type GamePlayerRolesKeysType = keyof typeof GAME_ROLES;

export interface PlayerGameInterface {
  role: DBGamePlayerRoleEnum;
  sitPlace: number;
  status: DBGameRoundPlayerStatusEnum;
  actions: DBGameRoundPlayerStatusEnum[];
}

export type PlayerGameDictType = { [id: string]: PlayerGameInterface };

export interface RoundReportInterface extends PlayerGameInterface {
  nickname: string;
}
