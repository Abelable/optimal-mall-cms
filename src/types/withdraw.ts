export interface WithdrawListSearchParams {
  status: number | undefined;
  page: number;
  limit: number;
}

export interface Withdraw {
  id: number;
  status: number;
  failureReason: string;
  userId: number;
  scene: number;
  path: number;
  withdrawAmount: number;
  taxFee: number;
  handlingFee: number;
  actualAmount: number;
  remark: string;
  createdAt: string;
  updatedAt: string;
}

export interface WithdrawListResult {
  list: Withdraw[];
  page: string;
  limit: string;
  total: string;
}

export interface WithdrawDetail extends Withdraw {}
