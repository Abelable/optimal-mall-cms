export interface EnterpriseInfoListSearchParams {
  status: number;
  name: string;
  page: number;
  limit: number;
}

export interface EnterpriseInfo {
  id: number;
  status: number;
  failureReason: string;
  userId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnterpriseInfoDetail extends EnterpriseInfo {
  bankName: string;
  bankCardCode: string;
  bankAddress: string;
  businessLicensePhoto: string;
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
}

export interface EnterpriseInfoListResult {
  list: EnterpriseInfo[];
  page: string;
  limit: string;
  total: string;
}
