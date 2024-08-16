export interface UsersSearchParams {
  nickname: string;
  mobile: string;
  level: number;
  superiorId: number;
  page: number;
  limit: number;
}

export interface User {
  id: number;
  avatar: string;
  nickname: string;
  mobile: string;
  gender: number;
  level: number;
  superiorId: number;
  createdAt: string;
}

export interface UsersResult {
  list: User[];
  page: string;
  limit: string;
  total: string;
}

export interface SuperiorOption {
  id: number;
  avatar: string;
  nickname: string;
}
