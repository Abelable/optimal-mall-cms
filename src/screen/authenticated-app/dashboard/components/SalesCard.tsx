import { Column } from "@ant-design/plots";
import { Card, Col, DatePicker, Row, Tabs } from "antd";
import { ButtonNoPadding } from "components/lib";
import numeral from "numeral";
import useStyles from "../style.style";

import type { DataItem } from "../data";
import type dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker/generatePicker/interface";

export type TimeType = "today" | "week" | "month" | "year";
const { RangePicker } = DatePicker;

const rankingListData: {
  title: string;
  total: number;
}[] = [];

for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

export const SalesCard = ({
  rangePickerValue,
  salesData,
  isActive,
  loading,
  handleRangePickerChange,
  selectDate,
}: {
  rangePickerValue: RangePickerProps<dayjs.Dayjs>["value"];
  isActive: (key: TimeType) => string;
  salesData: DataItem[];
  loading: boolean;
  handleRangePickerChange: RangePickerProps<dayjs.Dayjs>["onChange"];
  selectDate: (key: TimeType) => void;
}) => {
  const { styles } = useStyles();
  return (
    <Card
      loading={loading}
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
      style={{ marginBottom: "2.4rem" }}
    >
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <ButtonNoPadding
                  type="link"
                  className={isActive("today")}
                  onClick={() => selectDate("today")}
                  style={{ marginLeft: "2.4rem" }}
                >
                  今日
                </ButtonNoPadding>
                <ButtonNoPadding
                  type="link"
                  className={isActive("week")}
                  onClick={() => selectDate("week")}
                  style={{ marginLeft: "2.4rem" }}
                >
                  本周
                </ButtonNoPadding>
                <ButtonNoPadding
                  type="link"
                  className={isActive("month")}
                  onClick={() => selectDate("month")}
                  style={{ marginLeft: "2.4rem" }}
                >
                  本月
                </ButtonNoPadding>
                <ButtonNoPadding
                  type="link"
                  className={isActive("year")}
                  onClick={() => selectDate("year")}
                  style={{ marginLeft: "2.4rem" }}
                >
                  本年
                </ButtonNoPadding>
                {/* <a
                  className={isActive("month")}
                  onClick={() => selectDate("month")}
                >
                  今日
                </a>
                <a
                  className={isActive("week")}
                  onClick={() => selectDate("week")}
                >
                  本周
                </a>
                <a
                  className={isActive("month")}
                  onClick={() => selectDate("month")}
                >
                  本月
                </a>
                <a
                  className={isActive("year")}
                  onClick={() => selectDate("year")}
                >
                  本年
                </a> */}
              </div>
              <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{
                  width: 256,
                }}
              />
            </div>
          }
          size="large"
          tabBarStyle={{
            marginBottom: 24,
          }}
          items={[
            {
              key: "sales",
              label: "销售额",
              children: (
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Column
                        height={300}
                        data={salesData}
                        xField="x"
                        yField="y"
                        paddingBottom={12}
                        axis={{
                          x: {
                            title: false,
                          },
                          y: {
                            title: false,
                            gridLineDash: null,
                            gridStroke: "#ccc",
                          },
                        }}
                        scale={{
                          x: { paddingInner: 0.4 },
                        }}
                        tooltip={{
                          name: "销售量",
                          channel: "y",
                        }}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>商品销售额排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${styles.rankingItemNumber} ${
                                i < 3 ? styles.rankingItemNumberActive : ""
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span
                              className={styles.rankingItemTitle}
                              title={item.title}
                            >
                              {item.title}
                            </span>
                            <span>{numeral(item.total).format("0,0")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              ),
            },
            {
              key: "views",
              label: "订单量",
              children: (
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Column
                        height={300}
                        data={salesData}
                        xField="x"
                        yField="y"
                        paddingBottom={12}
                        axis={{
                          x: {
                            title: false,
                          },
                          y: {
                            title: false,
                          },
                        }}
                        scale={{
                          x: { paddingInner: 0.4 },
                        }}
                        tooltip={{
                          name: "订单量",
                          channel: "y",
                        }}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>商品订单量排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${
                                i < 3
                                  ? styles.rankingItemNumberActive
                                  : styles.rankingItemNumber
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span
                              className={styles.rankingItemTitle}
                              title={item.title}
                            >
                              {item.title}
                            </span>
                            <span>{numeral(item.total).format("0,0")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      </div>
    </Card>
  );
};
