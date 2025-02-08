export interface OrderListSearchParams {
  orderSn: string;
  status: number | undefined;
  goodsId: number | undefined;
  merchantId: number | undefined;
  userId: number | undefined;
  consignee: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface OrderGoods {
  id: number;
  cover: string;
  name: string;
  skuName: string;
  price: number;
  number: number;
}

export interface Order {
  id: number;
  orderSn: string;
  status: number;
  goodsList: OrderGoods[];
  refundAmount: number;
  merchantId: number;
  userInfo: { id: number; avatar: string; nickname: string };
  consignee: string;
  mobile: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderListResult {
  list: Order[];
  page: string;
  limit: string;
  total: string;
}

export interface Goods {
  id: number;
  cover: string;
  name: string;
  selectedSkuName: string;
  price: number;
  number: number;
}

export interface PackageGoods {
  goodsId: number;
  goodsCover: string;
  goodsName: string;
  goodsNumber: number;
}

export interface Package {
  id: number;
  shipChannel: string;
  shipCode?: string;
  shipSn: string;
  goodsList: Partial<Goods>[];
}

export interface OrderDetail extends Omit<Order, "goodsList"> {
  goodsList: Goods[];
  packageList: Package[];
  packageGoodsList: PackageGoods[];
  goodsPrice: number;
  couponDenomination: number;
  freightPrice: number;
  userId: number;
  merchantId: number;
  consignee: string;
  mobile: string;
  address: string;
  payTime: string;
  shipChannel: string;
  shipSn: string;
  shipTime: string;
  confirmTime: string;
  finishTime: string;
}
