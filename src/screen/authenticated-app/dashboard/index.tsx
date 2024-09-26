import styled from "@emotion/styled";
import { Statistic, Card, Typography } from "antd";

import { Area, Column, Pie } from "@ant-design/plots";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import numeral from "numeral";

export const Dashboard = () => {
  const orderData = [
    {
      x: "2024-09-26",
      y: 7,
    },
    {
      x: "2024-09-27",
      y: 5,
    },
    {
      x: "2024-09-28",
      y: 4,
    },
    {
      x: "2024-09-29",
      y: 2,
    },
    {
      x: "2024-09-30",
      y: 4,
    },
    {
      x: "2024-10-01",
      y: 7,
    },
    {
      x: "2024-10-02",
      y: 5,
    },
    {
      x: "2024-10-03",
      y: 6,
    },
    {
      x: "2024-10-04",
      y: 5,
    },
    {
      x: "2024-10-05",
      y: 9,
    },
    {
      x: "2024-10-06",
      y: 6,
    },
    {
      x: "2024-10-07",
      y: 3,
    },
    {
      x: "2024-10-08",
      y: 1,
    },
    {
      x: "2024-10-09",
      y: 5,
    },
    {
      x: "2024-10-10",
      y: 3,
    },
    {
      x: "2024-10-11",
      y: 6,
    },
    {
      x: "2024-10-12",
      y: 5,
    },
  ];

  const salesData = [
    {
      x: "1月",
      y: 703,
    },
    {
      x: "2月",
      y: 393,
    },
    {
      x: "3月",
      y: 244,
    },
    {
      x: "4月",
      y: 621,
    },
    {
      x: "5月",
      y: 812,
    },
    {
      x: "6月",
      y: 979,
    },
    {
      x: "7月",
      y: 941,
    },
    {
      x: "8月",
      y: 1189,
    },
    {
      x: "9月",
      y: 948,
    },
    {
      x: "10月",
      y: 1146,
    },
    {
      x: "11月",
      y: 284,
    },
    {
      x: "12月",
      y: 1194,
    },
  ];

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

  return (
    <Container>
      <Main>
        <CardList>
          <StatisticCard>
            <div style={{ padding: "2rem 2.4rem 0" }}>
              <Statistic
                title="总销售额"
                value={1265560}
                prefix="¥"
                valueStyle={{ fontSize: "3rem" }}
              />
              <StatisticDetail>
                <Area
                  xField="x"
                  yField="y"
                  shapeField="smooth"
                  height={46}
                  axis={false}
                  style={{
                    fill: "linear-gradient(-90deg, white 0%, #975FE4 100%)",
                    fillOpacity: 0.6,
                    width: "100%",
                  }}
                  padding={-20}
                  data={orderData}
                />
              </StatisticDetail>
              <CardBottom>
                <Row style={{ marginRight: "1.6rem" }}>
                  周同比 12% <CaretUpOutlined style={{ color: "#f5222d" }} />
                </Row>
                <Row>
                  日同比 11%
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                </Row>
              </CardBottom>
            </div>
          </StatisticCard>
          <StatisticCard>
            <div style={{ padding: "2rem 2.4rem 0" }}>
              <Statistic
                title="订单总数"
                value={8846}
                valueStyle={{ fontSize: "3rem" }}
              />
              <Area
                xField="x"
                yField="y"
                shapeField="smooth"
                height={46}
                axis={false}
                style={{
                  fill: "linear-gradient(-90deg, white 0%, #975FE4 100%)",
                  fillOpacity: 0.6,
                  width: "100%",
                }}
                padding={-20}
                data={orderData}
              />
              <CardBottom>
                <Row style={{ marginRight: "1.6rem" }}>
                  周同比 12% <CaretUpOutlined style={{ color: "#f5222d" }} />
                </Row>
                <Row>
                  日同比 11%
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                </Row>
              </CardBottom>
            </div>
          </StatisticCard>
          <StatisticCard>
            <div style={{ padding: "2rem 2.4rem 0" }}>
              <Statistic
                title="用户总数"
                value={6560}
                valueStyle={{ fontSize: "3rem" }}
              />
              <Column
                xField="x"
                yField="y"
                padding={-20}
                axis={false}
                height={46}
                data={orderData}
                scale={{ x: { paddingInner: 0.4 } }}
              />
              <CardBottom>
                <Row style={{ marginRight: "1.6rem" }}>
                  周同比 12% <CaretUpOutlined style={{ color: "#f5222d" }} />
                </Row>
                <Row>
                  日同比 11%
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                </Row>
              </CardBottom>
            </div>
          </StatisticCard>
          <StatisticCard>
            <div style={{ padding: "2rem 2.4rem 0" }}>
              <Statistic
                title="推广员总数"
                value={1220}
                valueStyle={{ fontSize: "3rem" }}
              />
              <Column
                xField="x"
                yField="y"
                padding={-20}
                axis={false}
                height={46}
                data={orderData}
                scale={{ x: { paddingInner: 0.4 } }}
              />
              <CardBottom>
                <Row style={{ marginRight: "1.6rem" }}>
                  周同比 12% <CaretUpOutlined style={{ color: "#f5222d" }} />
                </Row>
                <Row>
                  日同比 11%
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                </Row>
              </CardBottom>
            </div>
          </StatisticCard>
        </CardList>
        <CardList>
          <ChartCard title="商品佣金" bodyStyle={{ border: "none" }}>
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
          </ChartCard>
          <ChartCard title="礼包佣金" bodyStyle={{ border: "none" }}>
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
  margin-right: 2.4rem;
  flex: 1;
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
  height: 52px;
`;
const CardBottom = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.2rem;
  padding: 0.9rem 0;
  border-top: 1px solid rgba(5, 5, 5, 0.06);
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
