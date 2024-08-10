export interface RuralRegionListSearchParams {
  page: number;
  limit: number;
}

export interface RuralRegion {
  id: number;
  name: string;
}

export interface RuralRegionListResult {
  list: RuralRegion[];
  page: string;
  limit: string;
  total: string;
}

export interface RuralRegionOption {
  id: number;
  name: string;
}
