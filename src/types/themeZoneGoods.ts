export interface GoodsListSearchParams {
  themeId: number;
  page: number;
  limit: number;
}

export interface Goods {
  id: number;
  themeId: number;
  goodsId: number;
  goodsName: string;
  goodsCover: string;
  sort: number;
  createdAt: string;
}

export interface GoodsListResult {
  list: Goods[];
  page: string;
  limit: string;
  total: string;
}
