export interface SalesData {
  totalSales: number;
  dailySalesList: { createdAt: string; sum: number }[];
  dailyGrowthRate: number;
  weeklyGrowthRate: number;
}

export interface OrderCountData {
  totalCount: number;
  dailyCountList: { createdAt: string; count: number }[];
  dailyGrowthRate: number;
  weeklyGrowthRate: number;
}

export interface UserCountData extends OrderCountData {}

export interface PromoterCountData extends OrderCountData {}
