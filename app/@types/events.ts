export type EventStatusType = 'created' | 'in-process' | 'finished';

export interface EventType {
  id: string;
  title: string;
  date: Date;
  location: string;
  created_date: string;
  status: EventStatusType;
}

export type EventPlayersType = {
  event_id: string;
  player_id: string;
};
