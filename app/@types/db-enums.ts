export enum DBUserRolesEnum {
  player = 'player',
  admin = 'admin',
}

export enum DBEventStatusEnum {
  created = 'created',
  inProgress = 'in-progress',
  completed = 'completed',
}

export enum DBEventPlayerStatusEnum {
  active = 'active',
  inactive = 'inactive',
  banned = 'banned',
}

export enum DBGameStatusEnum {
  started = 'started',
  finished = 'finished',
}

export enum DBGameTurnEnum {
  day = 'day',
  night = 'night',
}

export enum DBGamePlayerRoleEnum {
  civilian = 'civilian',
  detective = 'detective',
  doctor = 'doctor',
  killer = 'killer',
  hooker = 'hooker',
  mafia = 'mafia',
  don = 'don',
}

export enum DBGameRoundPlayerStatusEnum {
  alive = 'alive',
  hilled_by_doctor = 'hilled_by_doctor',
  checked_by_detective = 'checked_by_detective',
  hooked = 'hooked',
  killed_by_detective = 'killed_by_detective',
  killed_by_day_vote = 'killed_by_day_vote',
  killed_by_killer = 'killed_by_killer',
  killed_by_mafia = 'killed_by_mafia',
}

export enum DBGameVinnerEnum {
  mafia = 'mafia',
  civilians = 'civilians',
}
