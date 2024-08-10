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
  sort: number;
  minLeaderCommissionRate: number;
  maxLeaderCommissionRate: number;
  minShareCommissionRate: number;
  maxShareCommissionRate: number;
}

export interface GoodsCategoriesResult {
  list: GoodsCategory[];
  page: string;
  limit: string;
  total: string;
}
