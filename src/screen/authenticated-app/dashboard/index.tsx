import styled from "@emotion/styled";
import { Statistic } from "antd";

import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

export const Dashboard = () => {
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
            <StatisticDetail></StatisticDetail>
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
            <StatisticDetail></StatisticDetail>
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
            <StatisticDetail></StatisticDetail>
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

  height: 4.6rem;
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
