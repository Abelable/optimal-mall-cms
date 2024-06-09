export interface CategoriesSearchParams {
  page: number;
  limit: number;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResult {
  list: Category[];
  page: string;
  limit: string;
  total: string;
}

export interface CategoryOption {
  id: number;
  name: string;
}
