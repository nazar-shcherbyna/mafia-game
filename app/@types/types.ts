import { DBUserType } from './db-types';

export type RegisteredUserGameType = Pick<DBUserType, 'id' | 'nickname'>;
