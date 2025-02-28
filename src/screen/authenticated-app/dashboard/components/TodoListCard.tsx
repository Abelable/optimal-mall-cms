import { Card } from "antd";
import { PageTitle, Row } from "components/lib";

export const TodoListCard = ({ loading }: { loading: boolean }) => (
  <Card
    loading={loading}
    title={
      <Row>
        <PageTitle>代办事项</PageTitle>
      </Row>
    }
    style={{ marginLeft: "2.4rem", flex: 1 }}
  ></Card>
);
