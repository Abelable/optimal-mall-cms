export interface GoodsListSearchParams {
  name: string;
  categoryId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface Goods {
  id: number;
  merchantId: number;
  categoryId: number;
  status: number;
  name: string;
  cover: string;
  imageList: string[];
  detailImageList: string[];
  defaultSpecImage: string;
  price: number;
  stock: number;
  leaderCommissionRate: number;
  shareCommissionRate: number;
  salesVolume: number;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoodsListResult {
  list: Goods[];
  page: string;
  limit: string;
  total: string;
}
