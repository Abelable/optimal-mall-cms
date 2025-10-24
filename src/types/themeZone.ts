export interface ThemeZoneOption {
  id: number;
  name: string;
}

export interface ThemeZoneListSearchParams {
  page: number;
  limit: number;
}

export interface ThemeZone {
  id: number;
  status: number;
  name: string;
  cover: string;
  bg: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeZoneListResult {
  list: ThemeZone[];
  page: string;
  limit: string;
  total: string;
}
