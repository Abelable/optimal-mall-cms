import { useState } from "react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { forEach, groupBy } from "lodash";
import {
  useOrderCountData,
  usePromoterCountData,
  useSalesData,
  useTopGoodsList,
  useUserCountData,
} from "service/dashboard";
import { getTimeDistance } from "./util";
import useStyles from "./style.style";

import { IntroduceRow } from "./components/IntroduceRow";
import { SalesCard } from "./components/SalesCard";
import { CommissionCard } from "./components/CommissionCard";
import { TodoListCard } from "./components/TodoListCard";
import { TopPromoter } from "./components/TopPromoter";

import type { RangePickerProps } from "antd/es/date-picker/generatePicker/interface";
import { PromoterProportionCard } from "./components/PromoterProportionCard";

type TimeType = "today" | "week" | "month" | "year";
type RangePickerValue = RangePickerProps<dayjs.Dayjs>["value"];

export const Dashboard = () => {
  const salesData = [
    {
      x: "1月",
      y: 703,
      type: "pending",
    },
    {
      x: "2月",
      y: 393,
      type: "pending",
    },
    {
      x: "3月",
      y: 244,
      type: "pending",
    },
    {
      x: "4月",
      y: 621,
      type: "pending",
    },
    {
      x: "5月",
      y: 812,
      type: "pending",
    },
    {
      x: "6月",
      y: 979,
      type: "pending",
    },
    {
      x: "7月",
      y: 941,
      type: "pending",
    },
    {
      x: "8月",
      y: 1189,
      type: "pending",
    },
    {
      x: "9月",
      y: 948,
      type: "pending",
    },
    {
      x: "10月",
      y: 1146,
      type: "pending",
    },
    {
      x: "11月",
      y: 284,
      type: "pending",
    },
    {
      x: "12月",
      y: 1194,
      type: "pending",
    },
    {
      x: "1月",
      y: 703,
      type: "settled",
    },
    {
      x: "2月",
      y: 393,
      type: "settled",
    },
    {
      x: "3月",
      y: 244,
      type: "settled",
    },
    {
      x: "4月",
      y: 621,
      type: "settled",
    },
    {
      x: "5月",
      y: 812,
      type: "settled",
    },
    {
      x: "6月",
      y: 979,
      type: "settled",
    },
    {
      x: "7月",
      y: 941,
      type: "settled",
    },
    {
      x: "8月",
      y: 1189,
      type: "settled",
    },
    {
      x: "9月",
      y: 948,
      type: "settled",
    },
    {
      x: "10月",
      y: 1146,
      type: "settled",
    },
    {
      x: "11月",
      y: 284,
      type: "settled",
    },
    {
      x: "12月",
      y: 1194,
      type: "settled",
    },
  ];
  const annotations: any = [];
  forEach(groupBy(salesData, "x"), (values, k) => {
    const value = values.reduce((a, b) => a + b.y, 0);
    annotations.push({
      type: "text",
      data: [k, value],
      style: {
        textAlign: "center",
        fontSize: 14,
        fill: "rgba(0,0,0,0.85)",
        text: `${value}`,
        textBaseline: "bottom",
        position: "top",
      },
      xField: "x",
      yField: "value",
      tooltip: false,
    });
  });

  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance("year")
  );
  const { data: topGoodsList } = useTopGoodsList({
    startDate: dayjs(rangePickerValue?.[0]).valueOf() / 1000,
    endDate: dayjs(rangePickerValue?.[1]).valueOf() / 1000,
  });

  const { data: _salesData, isLoading: salesLoading } = useSalesData();
  const { data: orderCountData, isLoading: orderCountLoading } =
    useOrderCountData();
  const { data: userCountData, isLoading: userCountLoading } =
    useUserCountData();
  const { data: promoterCountData, isLoading: promoterCountLoading } =
    usePromoterCountData();

  const { styles } = useStyles();

  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value);
  };
  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };
  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return "";
    }
    const value = getTimeDistance(type);
    if (!value) {
      return "";
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return "";
    }
    if (
      rangePickerValue[0].isSame(value[0] as dayjs.Dayjs, "day") &&
      rangePickerValue[1].isSame(value[1] as dayjs.Dayjs, "day")
    ) {
      return styles.currentDate;
    }
    return "";
  };

  return (
    <Container>
      <Main>
        <IntroduceRow
          salesData={_salesData}
          orderCountData={orderCountData}
          userCountData={userCountData}
          promoterCountData={promoterCountData}
          salesLoading={salesLoading}
          orderCountLoading={orderCountLoading}
          userCountLoading={userCountLoading}
          promoterCountLoading={promoterCountLoading}
        />

        <SalesCard
          rangePickerValue={rangePickerValue}
          salesData={_salesData}
          orderCountData={orderCountData}
          topGoodsList={topGoodsList}
          isActive={isActive}
          loading={salesLoading}
          handleRangePickerChange={handleRangePickerChange}
          selectDate={selectDate}
        />

        <CardList>
          <CommissionCard
            salesData={salesData}
            annotations={annotations}
            loading={salesLoading}
          />
          <TodoListCard loading={salesLoading} />
        </CardList>

        <CardList>
          <PromoterProportionCard loading={salesLoading} />
          <TopPromoter loading={salesLoading} />
        </CardList>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;

const CardList = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
`;
