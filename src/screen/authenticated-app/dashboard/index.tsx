import styled from "@emotion/styled";
import { Statistic } from "antd";

import { Area, Column } from "@ant-design/plots";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

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

  return (
    <Container>
      <Main>
        <CardList>
          <Card>
            <Statistic
              title="总销售额"
              value={1265560}
              prefix="¥"
              valueStyle={{ fontSize: "3rem" }}
            />
            <StatisticDetail>
              <Comparison>
                <Row style={{ marginRight: "1.6rem" }}>
                  周同比 12% <CaretUpOutlined style={{ color: "#f5222d" }} />
                </Row>
                <Row>
                  日同比 11%
                  <CaretDownOutlined style={{ color: "#52c41a" }} />
                </Row>
              </Comparison>
            </StatisticDetail>
            <CardBottom>
              <div style={{ marginRight: "0.8rem" }}>日销售额</div>
              <Statistic
                value={12423}
                prefix="¥"
                valueStyle={{
                  color: "rgba(0, 0, 0, 0.85)",
                  fontSize: "1.4rem",
                }}
              />
            </CardBottom>
          </Card>
          <Card>
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
              <div style={{ marginRight: "0.8rem" }}>日订单数</div>
              <Statistic
                value={1242}
                valueStyle={{
                  color: "rgba(0, 0, 0, 0.85)",
                  fontSize: "1.4rem",
                }}
              />
            </CardBottom>
          </Card>
          <Card>
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
              <div style={{ marginRight: "0.8rem" }}>当日新增</div>
              <Statistic
                value={1242}
                valueStyle={{
                  color: "rgba(0, 0, 0, 0.85)",
                  fontSize: "1.4rem",
                }}
              />
            </CardBottom>
          </Card>
          <Card>
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
              <div style={{ marginRight: "0.8rem" }}>当日新增</div>
              <Statistic
                value={1242}
                valueStyle={{
                  color: "rgba(0, 0, 0, 0.85)",
                  fontSize: "1.4rem",
                }}
              />
            </CardBottom>
          </Card>
        </CardList>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
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
`;
const Card = styled.div`
  margin-right: 2.4rem;
  padding: 2rem 2.4rem 0;
  flex: 1;
  background: #fff;
  border-radius: 0.8rem;
  &:last-child {
    margin-right: 0;
  }
`;
const StatisticDetail = styled.div`
  position: relative;
  height: 46px;
`;
const Comparison = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
`;
const CardBottom = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.2rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(5, 5, 5, 0.06);
`;
