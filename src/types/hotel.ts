export interface HotelListSearchParams {
  name: string;
  categoryId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

interface OpenTime {
  openMonth: string;
  closeMonth: string;
  openTime: string;
  closeTime: string;
  tips: string;
}
interface Policy {
  crowd: string;
  condition: string;
  content: string;
}
interface Facility {
  facilityId: number;
  content: string;
}
interface Project {
  image: string;
  name: string;
}
interface Tips {
  title: string;
  content: string;
}

export interface HotelDetail {
  id: number;
  name: string;
  level: string;
  categoryId: number;
  video: string;
  imageList: string[];
  longitude: number;
  latitude: number;
  address: string;
  brief: string;
  openTimeList: OpenTime[];
  policyList: Policy[];
  hotlineList: string[];
  facilityList: Facility[];
  projectList: Project[];
  tipsList: Tips[];
}

export interface Hotel {
  id: number;
  status: number;
  failureReason: string;
  name: string;
  level: string;
  categoryId: number;
  rate: number;
  createdAt: string;
  updatedAt: string;
}

export interface HotelListResult {
  list: Hotel[];
  page: string;
  limit: string;
  total: string;
}

export interface HotelOption {
  id: number;
  name: string;
}
