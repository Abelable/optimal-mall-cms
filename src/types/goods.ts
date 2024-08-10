export interface GoodsListSearchParams {
  name: string;
  categoryId: number | undefined;
  merchantId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface Spec {
  name: string;
  options: string[];
}

export interface Sku {
  name: string;
  image: string;
  price: number;
  stock: number;
}

export interface Goods {
  id: number;
  merchantId: number;
  categoryId: number;
  status: number;
  name: string;
  introduction: string;
  video: string;
  cover: string;
  imageList: string[];
  detailImageList: string[];
  defaultSpecImage: string;
  price: number;
  stock: number;
  leaderCommissionRate: number;
  shareCommissionRate: number;
  specList: Spec[];
  skuList: Sku[];
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

export interface GoodsOption {
  id: number;
  cover: string;
  name: string;
}
