export interface Pagination {
  total: number;
  current_page: number;
  per_page: number;
}

export interface OperatorOption {
  id: number;
  name: string;
}

export interface RegionOption {
  id: number;
  name: string;
  children?: RegionOption[];
}

export interface RegionItem {
  province_id: number;
  city_id: number;
}

export interface WarningSetting {
  address_repeated_prewarn_num: string;
  address_repeated_prewarn_num_check_period: string;
  phone_repeated_prewarn_num: string;
  phone_repeated_prewarn_num_check_period: string;
}
