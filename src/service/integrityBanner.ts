import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  Banner,
  BannerListResult,
  BannerListSearchParams,
} from "types/banner";

export const useBannerList = (params: Partial<BannerListSearchParams>) => {
  const client = useHttp();
  return useQuery<BannerListResult>(["integrity_banner_list", params], () =>
    client("integrity/banner/list", { data: params, method: "POST" })
  );
};

export const useBanner = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Banner>>(
    ["integrity_banner", { id }],
    () => client("integrity/banner/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Banner>) =>
      client("integrity/banner/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Banner>) =>
      client("integrity/banner/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useUpBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("integrity/banner/up", {
        data: { id },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDownBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("integrity/banner/down", {
        data: { id },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("integrity/banner/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
