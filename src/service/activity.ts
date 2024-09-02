import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import {
  useAddActivityGoodsConfig,
  useDeleteConfig,
  useEditConfig,
  useEndActivityConfig,
} from "./use-optimistic-options";

import type {
  Activity,
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

export const useActivity = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Activity>>(
    ["activity", { id }],
    () => client(`mall/activity/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
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

export const useEditActivity = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Activity>) =>
      client("mall/activity/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditTag = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, tag }: { id: number; tag: number }) =>
      client("mall/activity/edit_tag", {
        data: { id, tag },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditGoodsTag = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, goodsTag }: { id: number; goodsTag: number }) =>
      client("mall/activity/edit_goods_tag", {
        data: { id, goodsTag },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditFollowers = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, followers }: { id: number; followers: number }) =>
      client("mall/activity/edit_followers", {
        data: { id, followers },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditSales = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sales }: { id: number; sales: number }) =>
      client("mall/activity/edit_sales", {
        data: { id, sales },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEndActivity = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("mall/activity/end", {
        data: { id },
        method: "POST",
      }),
    useEndActivityConfig(queryKey)
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
