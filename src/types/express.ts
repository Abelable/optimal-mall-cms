export interface ExpressesSearchParams {
  page: number;
  limit: number;
}

export interface Express {
  id: number;
  code: string;
  name: string;
}

export interface ExpressesResult {
  list: Express[];
  page: string;
  limit: string;
  total: string;
}

export interface ExpressOption {
  name: string;
  code: string;
}
