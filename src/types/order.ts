export interface OrderListSearchParams {
  name: string;
  categoryId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface Order {
  id: number;
  cover: string;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
  leaderCommissionRate: number;
  shareCommissionRate: number;
  salesVolume: number;
  status: number;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderListResult {
  list: Order[];
  page: string;
  limit: string;
  total: string;
}
