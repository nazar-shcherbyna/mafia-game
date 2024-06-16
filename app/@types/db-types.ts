import {
  DBEventPlayerStatusEnum,
  DBEventStatusEnum,
  DBGamePlayerRoleEnum,
  DBGameRoundPlayerStatusEnum,
  DBGameStatusEnum,
  DBGameTurnEnum,
  DBGameVinnerEnum,
  DBUserRolesEnum,
} from './db-enums';

export interface DBUserType {
  id: string;
  nickname: string;
  password: string;
  joined_at: string;
  role: DBUserRolesEnum;
}

export interface DBEventType {
  id: string;
  admin_id: string;
  title: string;
  date: string;
  location: string;
  created_at: string;
  status: DBEventStatusEnum;
}

export interface DBEventPlayerType {
  player_id: string;
  event_id: string;
  status: DBEventPlayerStatusEnum;
}

export interface DBGameType {
  id: string;
  event_id: string;
  started_at: string;
  finished_at: string;
  round: string;
  status: DBGameStatusEnum;
  turn: DBGameTurnEnum;
  vinner: DBGameVinnerEnum;
}

export interface DBGamePlayerType {
  game_id: string;
  player_id: string;
  player_name: string;
  game_role: DBGamePlayerRoleEnum;
  position_number: string;
}

export interface DBGameRoundType {
  game_id: string;
  game_round: string;
  player_id: string;
  player_status: DBGameRoundPlayerStatusEnum;
}
