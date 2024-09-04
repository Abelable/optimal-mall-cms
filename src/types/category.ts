export interface CategoryOption {
  id: number;
  name: string;
}

export interface CategoriesSearchParams {
  page: number;
  limit: number;
}

export interface Category {
  id: number;
  status: number;
  name: string;
  sort: number;
}

export interface CategoriesResult {
  list: Category[];
  page: string;
  limit: string;
  total: string;
}
