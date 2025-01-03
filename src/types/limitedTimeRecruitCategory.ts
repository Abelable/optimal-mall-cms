export interface CategoryListSearchParams {
  page: number;
  limit: number;
}

export interface Category {
  id: number;
  status: number;
  name: string;
  sort: number;
}

export interface CategoryListResult {
  list: Category[];
  page: string;
  limit: string;
  total: string;
}

export interface CategoryOption {
  id: number;
  name: string;
}
