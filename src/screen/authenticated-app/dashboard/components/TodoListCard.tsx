import styled from "@emotion/styled";
import { Badge, Card } from "antd";
import { ButtonNoPadding, PageTitle, Row } from "components/lib";
import type { Todo } from "types/dashboard";

const typeDescOptions = [
  "您有一笔待发货订单，请及时处理",
  "您有一笔售后处理订单，请及时处理",
  "用户提交了实名认证审核，请及时处理",
  "用户提交了企业认证审核，请及时处理",
  "用户提交了佣金提现，请及时处理",
];

export const TodoListCard = ({
  todoList,
  loading,
}: {
  todoList: Todo[];
  loading: boolean;
}) => (
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
      {todoList.map((item) => (
        <TodoItem>
          <Badge status="processing" text={typeDescOptions[item.type - 1]} />
          <ButtonNoPadding type="link">立即处理</ButtonNoPadding>
        </TodoItem>
      ))}
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
