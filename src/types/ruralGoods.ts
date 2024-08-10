export interface RuralGoodsListSearchParams {
  regionId: number | undefined;
  page: number;
  limit: number;
}

export interface RuralGoods {
  id: number;
  regionId: number;
  goodsId: number;
  goodsName: string;
  goodsCover: string;
  createdAt: string;
}

export interface RuralGoodsListResult {
  list: RuralGoods[];
  page: string;
  limit: string;
  total: string;
}
