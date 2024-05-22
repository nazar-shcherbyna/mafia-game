export interface PlayerType {
  id: string;
  nickname: string;
  password: string;
}

export interface AuthFormType {
  nickname: string;
  password: string;
}

export type RegisteredPlayerGameType = Omit<PlayerType, "password">
