import { DBUserType } from './db-types';

export interface AuthFormType {
  nickname: string;
  password: string;
}

export type RegisteredUserGameType = Pick<DBUserType, 'id' | 'nickname'>;
