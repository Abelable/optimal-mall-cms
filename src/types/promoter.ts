export interface PromoterListSearchParams {
  level: number;
  page: number;
  limit: number;
}

export interface Promoter {
  id: number;
  user_id: number;
  avatar: string;
  nickname: string;
  level: number;
  scene: number;
  createdAt: string;
  updatedAt: string;
}

export interface PromoterListResult {
  list: Promoter[];
  page: string;
  limit: string;
  total: string;
}

export interface PromoterOption {
  id: number;
  avatar: string;
  nickname: string;
}
