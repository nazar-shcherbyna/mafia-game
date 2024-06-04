export interface UserType {
  id: string;
  nickname: string;
  password: string;
  joined_at: string;
  role: 'admin' | 'player';
}
