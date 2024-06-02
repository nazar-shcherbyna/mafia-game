export interface UserType {
  id: string;
  nickname: string;
  password: string;
  join_date: string;
  role: 'admin' | 'player';
}
