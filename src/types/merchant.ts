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
  companyName: string;
  consigneeName: string;
  mobile: string;
  addressDetail: string;
  managerIds: number[];
  license: string[];
  supplement: string;
}

export interface MerchantListResult {
  list: Merchant[];
  page: string;
  limit: string;
  total: string;
}

export interface RefundAddressListSearchParams {
  merchantId: number;
  page: number;
  limit: number;
}

export interface RefundAddress {
  id: number;
  consigneeName: string;
  mobile: string;
  addressDetail: string;
}

export interface RefundAddressListResult {
  list: RefundAddress[];
  page: string;
  limit: string;
  total: string;
}

export interface PickupAddressListSearchParams {
  merchantId: number;
  page: number;
  limit: number;
}

export interface PickupAddress {
  id: number;
  name: string;
  timeFrame: string;
  addressDetail: string;
  longitude: number;
  latitude: number;
}

export interface PickupAddressListResult {
  list: PickupAddress[];
  page: string;
  limit: string;
  total: string;
}
