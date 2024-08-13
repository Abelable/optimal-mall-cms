export interface IntegrityGoodsListSearchParams {
  page: number;
  limit: number;
}

export interface IntegrityGoods {
  id: number;
  goodsId: number;
  goodsName: string;
  goodsCover: string;
  createdAt: string;
}

export interface IntegrityGoodsListResult {
  list: IntegrityGoods[];
  page: string;
  limit: string;
  total: string;
}
