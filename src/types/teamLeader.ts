import type { DepositInfo } from "./common";

export interface TeamLeadersSearchParams {
  status: number;
  type: number;
  name: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface TeamLeader {
  id: number;
  type: number;
  name: string;
  mobile: string;
  status: number;
  depositInfo: DepositInfo;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamLeaderDetail extends TeamLeader {
  companyName: string;
  regionDesc: string;
  regionCodeList: string[];
  addressDetail: string;
  businessLicensePhoto: string;
  email: string;
  idCardNumber: string;
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
  holdIdCardPhoto: string;
  bankCardNumber: string;
  bankCardOwnerName: string;
  bankName: string;
}

export interface TeamLeadersResult {
  list: TeamLeader[];
  page: string;
  limit: string;
  total: string;
}
