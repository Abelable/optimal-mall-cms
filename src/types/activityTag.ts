export interface ActivityTagOption {
  id: number;
  name: string;
}

export interface ActivityTagListSearchParams {
  page: number;
  limit: number;
}

export interface ActivityTag {
  id: number;
  status: number;
  name: string;
  sort: number;
}

export interface ActivityTagListResult {
  list: ActivityTag[];
  page: string;
  limit: string;
  total: string;
}
