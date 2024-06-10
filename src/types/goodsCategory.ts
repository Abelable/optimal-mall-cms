export interface GoodsCategoryOption {
  id: number;
  name: string;
}

export interface GoodsCategoriesSearchParams {
  page: number;
  limit: number;
}

export interface GoodsCategory {
  id: number;
  name: string;
  minLeaderCommissionRate: number;
  maxLeaderCommissionRate: number;
  minShareCommissionRate: number;
  maxShareCommissionRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface GoodsCategoriesResult {
  list: GoodsCategory[];
  page: string;
  limit: string;
  total: string;
}
