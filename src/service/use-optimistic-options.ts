import { QueryKey, useQueryClient } from "react-query";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old: any) => any
) => {
  const queryClient = useQueryClient();
  return {
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: any) => callback(target, old));
      return { previousItems };
    },
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old
      ? {
          ...old,
          list: [
            {
              id: old.list[0] ? `${Number(old.list[0].id) + 1}` : "1",
              ...target,
            },
            ...old.list,
          ],
        }
      : null
  );

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old
      ? {
          ...old,
          list: old.list.map((item: any) =>
            item.id === target.id ? { ...item, ...target } : item
          ),
        }
      : null
  );

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => ({
    ...old,
    list: old.list.filter((item: any) => item.id !== target) || [],
  }));

export const useApprovedConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (id, old) =>
    old
      ? {
          ...old,
          list: old.list.map((item: any) =>
            item.id === id ? { ...item, status: 1 } : item
          ),
        }
      : null
  );

export const useUpConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (id, old) =>
    old
      ? {
          ...old,
          list: old.list.map((item: any) =>
            item.id === id ? { ...item, status: 1 } : item
          ),
        }
      : null
  );

export const useDownConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (id, old) =>
    old
      ? {
          ...old,
          list: old.list.map((item: any) =>
            item.id === id ? { ...item, status: 2 } : item
          ),
        }
      : null
  );

export const useRejectConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old
      ? {
          ...old,
          list: old.list.map((item: any) =>
            item.id === target.id ? { ...item, ...target, status: 3 } : item
          ),
        }
      : null
  );

export const useDeleteOrderConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (ids, old) =>
    old
      ? {
          ...old,
          list: old.list.map((item: any) =>
            ids.includes(item.id) ? { ...item, status: 103 } : item
          ),
        }
      : null
  );

export const useCancelOrderConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (ids, old) =>
    old
      ? {
          ...old,
          list: old.list.map((item: any) =>
            ids.includes(item.id) ? { ...item, status: 104 } : item
          ),
        }
      : null
  );

export const useAddRuralGoodsConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old
      ? {
          ...old,
          list: [
            ...target.goodsIds.map((id: number) => ({
              id,
            })),
            ...old.list,
          ],
        }
      : null
  );
