export interface GoodsListSearchParams {
  page: number;
  limit: number;
}

export interface Goods {
  id: number;
  goodsId: number;
  goodsName: string;
  goodsCover: string;
  sort: number;
  type?: number;
  createdAt: string;
}

export interface GoodsListResult {
  list: Goods[];
  page: string;
  limit: string;
  total: string;
}

export interface LocalGoodsListSearchParams {
  regionId: number | undefined;
  page: number;
  limit: number;
}

export interface LocalGoods {
  id: number;
  regionId: number;
  goodsId: number;
  goodsName: string;
  goodsCover: string;
  createdAt: string;
}

export interface LocalGoodsListResult {
  list: LocalGoods[];
  page: string;
  limit: string;
  total: string;
}
