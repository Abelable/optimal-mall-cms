export interface SalesData {
  totalSales: number;
  dailySalesList: { createdAt: string; sum: number }[];
  dailyGrowthRate: number;
  weeklyGrowthRate: number;
  monthlySalesList: { month: string; sum: number }[];
}

export interface OrderCountData {
  totalCount: number;
  dailyCountList: { createdAt: string; count: number }[];
  dailyGrowthRate: number;
  weeklyGrowthRate: number;
  repurchaseRate: number;
}

export interface UserCountData extends Omit<OrderCountData, "repurchaseRate"> {
  orderRate: number;
}

export interface PromoterCountData extends OrderCountData {}
