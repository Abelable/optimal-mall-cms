export interface RegionListSearchParams {
  page: number;
  limit: number;
}

export interface Region {
  id: number;
  status: number;
  name: string;
  sort: number;
}

export interface RegionListResult {
  list: Region[];
  page: string;
  limit: string;
  total: string;
}

export interface RegionOption {
  id: number;
  name: string;
}
