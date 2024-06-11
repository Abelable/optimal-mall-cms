export interface TeamLeadersSearchParams {
  status: number;
  name: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface TeamLeader {
  id: number;
  name: string;
  mobile: string;
  status: number;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamLeaderDetail extends TeamLeader {
  email: string;
  idCardNumber: string;
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
  holdIdCardPhoto: string;
  qualificationPhoto: string;
}

export interface TeamLeadersResult {
  list: TeamLeader[];
  page: string;
  limit: string;
  total: string;
}
