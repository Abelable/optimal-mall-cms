import { Card, Table } from "antd";
import { PageTitle, Row } from "components/lib";

const promoterList = [
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
  { nickname: "jjjsjs", amount: 122, count: 1111 },
];

export const TopPromoter = ({ loading }: { loading: boolean }) => {
  const columns = [
    {
      title: "排名",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "推广员",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "累计佣金",
      dataIndex: "amount",
      key: "amount",
      sorter: (
        a: {
          amount: number;
        },
        b: {
          amount: number;
        }
      ) => a.amount - b.amount,
    },
    {
      title: "推广人数",
      dataIndex: "count",
      key: "count",
      sorter: (
        a: {
          count: number;
        },
        b: {
          count: number;
        }
      ) => a.count - b.count,
    },
  ];
  return (
    <Card
      loading={loading}
      variant="borderless"
      title={
        <Row>
          <PageTitle>推广员排行榜</PageTitle>
        </Row>
      }
      style={{
        flex: 5,
        height: "100%",
      }}
    >
      <Table<any>
        rowKey={(record) => record.index}
        size="small"
        columns={columns}
        dataSource={promoterList}
        pagination={{
          style: {
            marginBottom: 0,
          },
          pageSize: 8,
        }}
      />
    </Card>
  );
};
