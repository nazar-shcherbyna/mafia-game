import { DBEventStatusEnum } from './db-enums';

export interface EventType {
  id: string;
  title: string;
  date: Date;
  location: string;
  created_date: string;
  status: DBEventStatusEnum;
}

export type EventUsersType = {
  event_id: string;
  user_id: string;
};

export interface JoinEventFormStateType {
  message: string;
}
