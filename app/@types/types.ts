import { UserType } from './users';

export interface AuthFormType {
  nickname: string;
  password: string;
}

export type RegisteredUserGameType = Pick<UserType, 'id' | 'nickname'>;
