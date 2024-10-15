import { useQuery } from "react-query";
import { useHttp } from "./http";

import type { SalesData } from "types/dashboard";

export const useSalesData = () => {
  const client = useHttp();
  return useQuery<SalesData>(["sales_data"], () =>
    client("dashboard/sales_data")
  );
};
