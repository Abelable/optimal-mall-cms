export interface OrderListSearchParams {
  orderSn: string;
  status: number | undefined;
  merchantId: number | undefined;
  userId: number | undefined;
  consignee: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface Order {
  id: number;
  orderSn: string;
  status: number;
  goodsList: { id: number; cover: string; name: string; number: number }[];
  refundAmount: number;
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

export interface OrderDetail extends Order {
  goodsList: Goods[];
  goodsPrice: number;
  couponDenomination: number;
  freightPrice: number;
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
