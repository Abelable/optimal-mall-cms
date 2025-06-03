export interface SalesData {
  totalSales: number;
  dailySalesList: { createdAt: string; sum: number }[];
  monthlySalesList: { month: string; sum: number }[];
  dailyGrowthRate: number;
  weeklyGrowthRate: number;
}

export interface OrderCountData {
  totalCount: number;
  dailyCountList: { createdAt: string; count: number }[];
  monthlyCountList: { month: string; count: number }[];
  dailyGrowthRate: number;
  weeklyGrowthRate: number;
}

export interface UserCountData extends Omit<OrderCountData, "repurchaseRate"> {
  orderRate: number;
  repurchaseRate: number;
}

export interface PromoterCountData extends OrderCountData {
  levelsCountList: { level: number; number: number }[];
}

export interface TopGoodsList {
  topSalesGoodsList: { id: number; cover: string; name: string; sum: number }[];
  topOrderCountGoodsList: {
    id: number;
    cover: string;
    name: string;
    count: number;
  }[];
}

export interface CommissionData {
  monthlyCommissionList: { month: string; sum: number }[];
  monthlyGiftCommissionList: { month: string; sum: number }[];
  monthlyTeamCommissionList: { month: string; sum: number }[];
  pendingCommissionSum: number;
  settledCommissionSum: number;
  pendingGiftCommissionSum: number;
  settledGiftCommissionSum: number;
  pendingTeamCommissionSum: number;
  settledTeamCommissionSum: number;
}

export interface Todo {
  type: number;
  referenceId: number;
}
