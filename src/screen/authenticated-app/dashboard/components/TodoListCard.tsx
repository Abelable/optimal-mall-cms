import styled from "@emotion/styled";
import { Badge, Card } from "antd";
import { ButtonNoPadding, PageTitle, Row } from "components/lib";

export const TodoListCard = ({ loading }: { loading: boolean }) => (
  <Card
    loading={loading}
    title={
      <Row>
        <PageTitle>代办事项</PageTitle>
        <Badge style={{ marginLeft: "0.8rem" }} count={25} />
      </Row>
    }
    style={{ marginLeft: "2.4rem", flex: 1 }}
  >
    <div style={{ height: "37rem", overflowY: "scroll" }}>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
      <TodoItem>
        <Badge status="processing" text="您有一份订单超时未出货，请及时处理" />
        <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
      </TodoItem>
    </div>
  </Card>
);

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  padding-left: 0.4rem;
  width: 100%;
`;
