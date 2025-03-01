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
  repurchaseRate: number;
}

export interface UserCountData extends Omit<OrderCountData, "repurchaseRate"> {
  orderRate: number;
}

export interface PromoterCountData extends OrderCountData {}

export interface TopGoodsList {
  topSalesGoodsList: { id: number; cover: string; name: string; sum: number }[];
  topOrderCountGoodsList: {
    id: number;
    cover: string;
    name: string;
    count: number;
  }[];
}
