export interface PromoterListSearchParams {
  nickname: string;
  mobile: string;
  level: number;
  path: number;
  page: number;
  limit: number;
}

export interface Promoter {
  id: number;
  user_id: number;
  avatar: string;
  nickname: string;
  mobile: string;
  level: number;
  scene: number;
  path: number;
  promotedUserNumber: number;
  commissionSum: number;
  giftCommissionSum: number;
  teamCommissionSum: number;
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
  level: number;
}
