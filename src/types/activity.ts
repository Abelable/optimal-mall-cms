export interface ActivityListSearchParams {
  name: string;
  status: number;
  goodsType: number;
  page: number;
  limit: number;
}

export interface Activity {
  id: number;
  status: number;
  startTime: string;
  endTime: string;
  goodsType: number;
  goodsId: number;
  goodsName: string;
  goodsCover: string;
  followers: number;
  sales: number;
  createdAt: string;
}

export interface ActivityListResult {
  list: Activity[];
  page: string;
  limit: string;
  total: string;
}

export interface ActivityForm {
  status: number;
  startTime: string;
  endTime: string;
  goodsType: number;
  goodsIds: number[];
}
