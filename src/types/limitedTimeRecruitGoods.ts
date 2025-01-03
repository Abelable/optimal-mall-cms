export interface GoodsListSearchParams {
  categoryId: number | undefined;
  page: number;
  limit: number;
}

export interface Goods {
  id: number;
  categoryId: number;
  goodsId: number;
  goodsName: string;
  goodsCover: string;
  createdAt: string;
}

export interface GoodsListResult {
  list: Goods[];
  page: string;
  limit: string;
  total: string;
}
