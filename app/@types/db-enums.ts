export type DBUserRolesEnumType = 'player' | 'admin';
export type DBEventStatusEnumType = 'created' | 'in-progress' | 'completed';
export type DBGameStatusEnumType = 'started' | 'finished';
export type DBGameTurnEnumType = 'day' | 'night';
export type DBEventPlayerStatusEnumType = 'active' | 'inactive' | 'banned';
export type DBGamePlayerRoleEnumType =
  | 'civilian'
  | 'detective'
  | 'doctor'
  | 'killer'
  | 'hooker'
  | 'mafia'
  | 'don';

export type DBGamePlayerStatusEnumType =
  | 'alive'
  | 'hilled_by_doctor'
  | 'checked_by_detective'
  | 'hooked'
  | 'killed_by_detective'
  | 'killed_by_day_vote'
  | 'killed_by_killer'
  | 'killed_by_mafia';
