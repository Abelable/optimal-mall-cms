export interface OrderListSearchParams {
  orderSn: string;
  status: number | undefined;
  consignee: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface Order {
  id: number;
  orderSn: string;
  status: number;
  paymentAmount: string;
  consignee: string;
  mobile: string;
  createdAt: string;
}

export interface OrderListResult {
  list: Order[];
  page: string;
  limit: string;
  total: string;
}
