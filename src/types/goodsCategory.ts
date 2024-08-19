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
  status: number;
  name: string;
  sort: number;
}

export interface GoodsCategoriesResult {
  list: GoodsCategory[];
  page: string;
  limit: string;
  total: string;
}
