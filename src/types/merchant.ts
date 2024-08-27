export interface MerchantListSearchParams {
  name: string;
  consigneeName: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface Merchant {
  id: number;
  name: string;
  consigneeName: string;
  mobile: string;
  addressDetail: string;
  license: string[];
  supplement: string;
}

export interface MerchantListResult {
  list: Merchant[];
  page: string;
  limit: string;
  total: string;
}
