import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useBanner } from "service/banner";
import dayjs from "dayjs";

import type { RangePickerProps } from "antd/es/date-picker/generatePicker/interface";

type RangePickerValue = RangePickerProps<dayjs.Dayjs>["value"];

export const useTopPromoterListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 8,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useBannerListQueryKey = () => {
  const [params] = useTopPromoterListSearchParams();
  return ["top_promoter_list", params];
};

export const useBannerModal = () => {
  const [{ bannerCreate }, setBannerModalOpen] = useUrlQueryParams([
    "bannerCreate",
  ]);
  const [{ editingBannerId }, setEditingBannerId] = useUrlQueryParams([
    "editingBannerId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingBanner, isLoading } = useBanner(Number(editingBannerId));

  const open = useCallback(
    () => setBannerModalOpen({ bannerCreate: true }),
    [setBannerModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingBannerId({ editingBannerId: `${id}` }),
    [setEditingBannerId]
  );
  const close = useCallback(
    () => setUrlParams({ bannerCreate: "", editingBannerId: "" }),
    [setUrlParams]
  );

  return {
    bannerModalOpen: bannerCreate === "true" || !!editingBannerId,
    editingBannerId,
    editingBanner,
    isLoading,
    open,
    startEdit,
    close,
  };
};

export function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(
  type: "today" | "week" | "month" | "year"
): RangePickerValue {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === "today") {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [dayjs(now), dayjs(now.getTime() + (oneDay - 1000))];
  }

  if (type === "week") {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [dayjs(beginTime), dayjs(beginTime + (7 * oneDay - 1000))];
  }
  const year = now.getFullYear();

  if (type === "month") {
    const month = now.getMonth();
    const nextDate = dayjs(now).add(1, "months");
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      dayjs(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      dayjs(
        dayjs(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() -
          1000
      ),
    ];
  }

  return [dayjs(`${year}-01-01 00:00:00`), dayjs(`${year}-12-31 23:59:59`)];
}
