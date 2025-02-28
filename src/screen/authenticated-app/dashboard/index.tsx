import styled from "@emotion/styled";
import { Statistic, Card, Typography } from "antd";

import { Area, Column, Pie } from "@ant-design/plots";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import numeral from "numeral";
import { forEach, groupBy } from "lodash";
import {
  useOrderCountData,
  usePromoterCountData,
  useSalesData,
  useUserCountData,
} from "service/dashboard";
import dayjs from "dayjs";

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
  const salesPieData = [
    {
      x: "家用电器",
      y: 4544,
    },
    {
      x: "食用酒水",
      y: 3321,
    },
    {
      x: "个护健康",
      y: 3113,
    },
    {
      x: "服饰箱包",
      y: 2341,
    },
    {
      x: "母婴产品",
      y: 1231,
    },
    {
      x: "其他",
      y: 1231,
    },
  ];

  const { data: _salesData } = useSalesData();
  const { data: orderCountData } = useOrderCountData();
  const { data: userCountData } = useUserCountData();
  const { data: promoterCountData } = usePromoterCountData();

  return (
    <Container>
      <Main>
        <CardList>
          <StatisticCard>
            <Statistic
              title="总销售额"
              value={_salesData?.totalSales}
              prefix="¥"
              valueStyle={{ fontSize: "3rem" }}
            />
            <StatisticDetail>
              <Area
                xField="x"
                yField="y"
                shapeField="smooth"
                axis={false}
                padding={-10}
                height={60}
                style={{
                  fill: "linear-gradient(-90deg, white 0%, #975FE4 100%)",
                  fillOpacity: 0.6,
                  width: "100%",
                }}
                data={
                  _salesData?.dailySalesList
                    ? _salesData?.dailySalesList.map((item) => ({
                        x: dayjs(item.createdAt).format("YYYY-MM-DD"),
                        y: Math.round(item.sum),
                      }))
                    : []
                }
              />
            </StatisticDetail>
            <CardBottom>
              <Row style={{ marginRight: "1.6rem" }}>
                周同比 {Math.abs(_salesData?.weeklyGrowthRate as number)}%{" "}
                {(_salesData?.weeklyGrowthRate as number) >= 0 ? (
                  <CaretUpOutlined style={{ color: "#f5222d" }} />
                ) : (
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                )}
              </Row>
              <Row>
                日同比 {Math.abs(_salesData?.dailyGrowthRate as number)}%
                {(_salesData?.dailyGrowthRate as number) >= 0 ? (
                  <CaretUpOutlined style={{ color: "#f5222d" }} />
                ) : (
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                )}
              </Row>
            </CardBottom>
          </StatisticCard>
          <StatisticCard>
            <Statistic
              title={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>订单总数</div>
                  <div>
                    复购率{" "}
                    <span style={{ color: "#1890ff" }}>
                      {orderCountData?.repurchaseRate}%
                    </span>
                  </div>
                </div>
              }
              value={orderCountData?.totalCount}
              valueStyle={{ fontSize: "3rem" }}
            />
            <StatisticDetail>
              <Area
                xField="x"
                yField="y"
                shapeField="smooth"
                axis={false}
                padding={-10}
                height={60}
                style={{
                  fill: "linear-gradient(-90deg, white 0%, #975FE4 100%)",
                  fillOpacity: 0.6,
                  width: "100%",
                }}
                data={
                  orderCountData?.dailyCountList
                    ? orderCountData?.dailyCountList.map((item) => ({
                        x: dayjs(item.createdAt).format("YYYY-MM-DD"),
                        y: Math.round(item.count),
                      }))
                    : []
                }
              />
            </StatisticDetail>
            <CardBottom>
              <Row style={{ marginRight: "1.6rem" }}>
                周同比 {Math.abs(orderCountData?.weeklyGrowthRate as number)}%{" "}
                {(orderCountData?.weeklyGrowthRate as number) >= 0 ? (
                  <CaretUpOutlined style={{ color: "#f5222d" }} />
                ) : (
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                )}
              </Row>
              <Row>
                日同比 {Math.abs(orderCountData?.dailyGrowthRate as number)}%
                {(orderCountData?.dailyGrowthRate as number) >= 0 ? (
                  <CaretUpOutlined style={{ color: "#f5222d" }} />
                ) : (
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                )}
              </Row>
            </CardBottom>
          </StatisticCard>
          <StatisticCard>
            <Statistic
              title={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>用户总数</div>
                  <div>
                    下单率{" "}
                    <span style={{ color: "#1890ff" }}>
                      {userCountData?.orderRate}%
                    </span>
                  </div>
                </div>
              }
              value={userCountData?.totalCount}
              valueStyle={{ fontSize: "3rem" }}
            />
            <StatisticDetail>
              <Column
                xField="x"
                yField="y"
                axis={false}
                padding={-10}
                height={60}
                data={
                  userCountData?.dailyCountList
                    ? userCountData?.dailyCountList.map((item) => ({
                        x: dayjs(item.createdAt).format("YYYY-MM-DD"),
                        y: Math.round(item.count),
                      }))
                    : []
                }
                scale={{ x: { paddingInner: 0.4 } }}
              />
            </StatisticDetail>
            <CardBottom>
              <Row style={{ marginRight: "1.6rem" }}>
                周同比 {Math.abs(userCountData?.weeklyGrowthRate as number)}%{" "}
                {(userCountData?.weeklyGrowthRate as number) >= 0 ? (
                  <CaretUpOutlined style={{ color: "#f5222d" }} />
                ) : (
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                )}
              </Row>
              <Row>
                日同比 {Math.abs(userCountData?.dailyGrowthRate as number)}%
                {(userCountData?.dailyGrowthRate as number) >= 0 ? (
                  <CaretUpOutlined style={{ color: "#f5222d" }} />
                ) : (
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                )}
              </Row>
            </CardBottom>
          </StatisticCard>
          <StatisticCard>
            <Statistic
              title="推广员总数"
              value={promoterCountData?.totalCount}
              valueStyle={{ fontSize: "3rem" }}
            />
            <StatisticDetail>
              <Column
                xField="x"
                yField="y"
                axis={false}
                padding={-10}
                height={60}
                data={
                  promoterCountData?.dailyCountList
                    ? promoterCountData?.dailyCountList.map((item) => ({
                        x: dayjs(item.createdAt).format("YYYY-MM-DD"),
                        y: Math.round(item.count),
                      }))
                    : []
                }
                scale={{ x: { paddingInner: 0.4 } }}
              />
            </StatisticDetail>
            <CardBottom>
              <Row style={{ marginRight: "1.6rem" }}>
                周同比 {Math.abs(promoterCountData?.weeklyGrowthRate as number)}
                %{" "}
                {(promoterCountData?.weeklyGrowthRate as number) >= 0 ? (
                  <CaretUpOutlined style={{ color: "#f5222d" }} />
                ) : (
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                )}
              </Row>
              <Row>
                日同比 {Math.abs(promoterCountData?.dailyGrowthRate as number)}%
                {(promoterCountData?.dailyGrowthRate as number) >= 0 ? (
                  <CaretUpOutlined style={{ color: "#f5222d" }} />
                ) : (
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                )}
              </Row>
            </CardBottom>
          </StatisticCard>
        </CardList>
        <CardList>
          <ChartCard title="商品佣金" bodyStyle={{ border: "none" }}>
            <Column
              height={300}
              data={salesData}
              xField="x"
              yField="y"
              colorField="type"
              label={{
                text: "y",
                textBaseline: "bottom",
                position: "inside",
              }}
              stack
              annotations={annotations}
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
          </ChartCard>
          <ChartCard title="礼包佣金" bodyStyle={{ border: "none" }}>
            <Column
              height={300}
              data={salesData}
              xField="x"
              yField="y"
              colorField="type"
              label={{
                text: "y",
                textBaseline: "bottom",
                position: "inside",
              }}
              stack
              annotations={annotations}
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
          </ChartCard>
        </CardList>
        <CardList>
          <ChartCard title="销售额类别占比" bodyStyle={{ border: "none" }}>
            <div>
              <Typography.Text>销售额</Typography.Text>
              <Pie
                height={340}
                radius={0.8}
                innerRadius={0.5}
                angleField="y"
                colorField="x"
                data={salesPieData as any}
                legend={false}
                label={{
                  position: "spider",
                  text: (item: { x: number; y: number }) => {
                    return `${item.x}: ${numeral(item.y).format("0,0")}`;
                  },
                }}
              />
            </div>
          </ChartCard>
          <ChartCard title="推广员类别占比" bodyStyle={{ border: "none" }}>
            <div>
              <Typography.Text>推广员</Typography.Text>
              <Pie
                height={340}
                radius={0.8}
                innerRadius={0.5}
                angleField="y"
                colorField="x"
                data={salesPieData as any}
                legend={false}
                label={{
                  position: "spider",
                  text: (item: { x: number; y: number }) => {
                    return `${item.x}: ${numeral(item.y).format("0,0")}`;
                  },
                }}
              />
            </div>
          </ChartCard>
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

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const CardList = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
`;
const StatisticCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2.4rem;
  padding: 2rem 2.4rem 0;
  flex: 1;
  height: 20rem;
  background: #fff;
  border-radius: 0.8rem;
  &:last-child {
    margin-right: 0;
  }
  canvas {
    width: 100% !important;
  }
`;
const StatisticDetail = styled.div`
  position: relative;
  flex: 1;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
`;
const CardBottom = styled.div`
  display: flex;
  align-items: center;
  padding: 0.9rem 0;
`;

const ChartCard = styled(Card)`
  margin-right: 2.4rem;
  flex: 1;
  border-radius: 0.8rem;
  &:last-child {
    margin-right: 0;
  }
  canvas {
    width: 100% !important;
  }
`;
