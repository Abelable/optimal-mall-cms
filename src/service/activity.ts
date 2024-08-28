import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import {
  useAddActivityGoodsConfig,
  useDeleteConfig,
} from "./use-optimistic-options";

import type {
  ActivityForm,
  ActivityListResult,
  ActivityListSearchParams,
} from "types/activity";

export const useActivityList = (params: Partial<ActivityListSearchParams>) => {
  const client = useHttp();
  return useQuery<ActivityListResult>(["activity_list", params], () =>
    client("mall/activity/list", { data: params, method: "POST" })
  );
};

export const useAddActivity = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ActivityForm>) =>
      client("mall/activity/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddActivityGoodsConfig(queryKey)
  );
};

export const useDeleteActivity = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("mall/activity/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
