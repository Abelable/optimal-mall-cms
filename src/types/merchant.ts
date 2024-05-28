export interface MerchantListSearchParams {
  page: number;
  limit: number;
}

export interface Merchant {
  id: number;
  name: string;
}

export interface MerchantListResult {
  list: Merchant[];
  page: string;
  limit: string;
  total: string;
}
