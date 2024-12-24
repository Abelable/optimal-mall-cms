import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type {
  Express,
  ExpressesResult,
  ExpressesSearchParams,
  ExpressOption,
} from "types/express";

export const useExpresses = (params: Partial<ExpressesSearchParams>) => {
  const client = useHttp();
  return useQuery<ExpressesResult>(["expresses", params], () =>
    client("express/list", { data: params, method: "POST" })
  );
};

export const useExpress = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Express>>(
    ["express", { id }],
    () => client(`express/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddExpress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Express>) =>
      client("express/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditExpress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Express>) =>
      client("express/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteExpress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("express/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useExpressOptions = () => {
  const client = useHttp();
  return useQuery<ExpressOption[]>(["express_options"], () =>
    client("express/options")
  );
};
