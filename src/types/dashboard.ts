export interface SalesData {
  totalSales: number;
  dailySalesList: { createdAt: string; sum: number }[];
  dailyGrowthRate: number;
  weeklyGrowthRate: number;
}
