export interface LiveUserListSearchParams {
  page: number;
  limit: number;
}

export interface LiveUser {
  id: number;
  userId: number;
  avatar: string;
  nickname: string;
  createdAt: string;
}

export interface LiveUserListResult {
  list: LiveUser[];
  page: string;
  limit: string;
  total: string;
}
