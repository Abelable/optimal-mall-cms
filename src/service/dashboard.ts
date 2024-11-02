import { useQuery } from "react-query";
import { useHttp } from "./http";

import type {
  OrderCountData,
  PromoterCountData,
  SalesData,
  UserCountData,
} from "types/dashboard";

export const useSalesData = () => {
  const client = useHttp();
  return useQuery<SalesData>(["sales_data"], () =>
    client("dashboard/sales_data")
  );
};

export const useOrderCountData = () => {
  const client = useHttp();
  return useQuery<OrderCountData>(["order_count_data"], () =>
    client("dashboard/order_count_data")
  );
};

export const useUserCountData = () => {
  const client = useHttp();
  return useQuery<UserCountData>(["user_count_data"], () =>
    client("dashboard/user_count_data")
  );
};

export const usePromoterCountData = () => {
  const client = useHttp();
  return useQuery<PromoterCountData>(["promoter_count_data"], () =>
    client("dashboard/promoter_count_data")
  );
};
