import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useCategory } from "service/category";

export const useCategoriesSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useCategoriesQueryKey = () => {
  const [params] = useCategoriesSearchParams();
  return ["goods_categories", params];
};

export const useCategoryModal = () => {
  const [{ categoryCreate }, setCategoryModalOpen] = useUrlQueryParams([
    "categoryCreate",
  ]);
  const [{ editingCategoryId }, setEditingCategoryId] = useUrlQueryParams([
    "editingCategoryId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingCategory, isLoading } = useCategory(
    Number(editingCategoryId)
  );

  const open = useCallback(
    () => setCategoryModalOpen({ categoryCreate: true }),
    [setCategoryModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingCategoryId({ editingCategoryId: `${id}` }),
    [setEditingCategoryId]
  );
  const close = useCallback(
    () => setUrlParams({ categoryCreate: "", editingCategoryId: "" }),
    [setUrlParams]
  );

  return {
    categoryModalOpen: categoryCreate === "true" || !!editingCategoryId,
    editingCategoryId,
    editingCategory,
    isLoading,
    open,
    startEdit,
    close,
  };
};
