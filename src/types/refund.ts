export interface RefundListSearchParams {
  orderSn: string;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface Refund {
  id: number;
  orderSn: string;
  status: number;
  refundType: number;
  refundAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RefundListResult {
  list: Refund[];
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
  couponDenomination: number;
}

export interface RefundDetail extends Refund {
  goodsInfo: Goods;
  shipChannel: string;
  shipSn: string;
  shipTime: string;
  confirmTime: string;
  finishTime: string;
}
