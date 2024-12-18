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
  image: string;
  name: string;
  price: number;
  originalPrice: number;
  commissionRate: number;
  stock: number;
  limit: number;
}

export interface Goods {
  id: number;
  merchantId: number;
  categoryIds: number[];
  status: number;
  name: string;
  introduction: string;
  video: string;
  cover: string;
  activityCover: string;
  imageList: string[];
  detailImageList: string[];
  defaultSpecImage: string;
  price: number;
  stock: number;
  commissionRate: number;
  refundStatus: number;
  numberLimit: number;
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
