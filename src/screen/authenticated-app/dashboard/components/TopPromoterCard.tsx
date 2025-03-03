import { Card, Progress, Table, TablePaginationConfig, Tag } from "antd";
import { TableProps } from "antd/lib";
import { OptionAvatar, PageTitle, Row } from "components/lib";
import { UserOutlined } from "@ant-design/icons";

import first from "assets/images/rank/1.png";
import second from "assets/images/rank/2.png";
import third from "assets/images/rank/3.png";

import type { PageParams } from "types/common";
import type { TopPromoter } from "types/promoter";
import styled from "@emotion/styled";

interface ListProps extends TableProps<TopPromoter> {
  loading: boolean;
  params: Partial<PageParams>;
  setParams: (params: Partial<PageParams>) => void;
}

const levelOptions = [
  { text: "乡村振兴推广员", value: 1, scene: 100 },
  { text: "乡村振兴服务商C1", value: 2, scene: 201 },
  { text: "乡村振兴服务商C2", value: 3, scene: 202 },
  { text: "乡村振兴服务商C3", value: 4, scene: 203 },
  { text: "乡村振兴委员会", value: 5, scene: 300 },
];

export const TopPromoterCard = ({
  loading,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

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
      <Table
        size="small"
        rowKey={"id"}
        columns={[
          {
            title: "排名",
            dataIndex: "rank",
            render: (value) => (
              <>
                {[1, 2, 3].includes(value) ? (
                  <Medal src={[first, second, third][value - 1]} alt="" />
                ) : (
                  value
                )}
              </>
            ),
          },
          {
            title: "推广员",
            render: (value, promoter) => (
              <>
                <OptionAvatar src={promoter.avatar} icon={<UserOutlined />} />
                <span>{promoter.nickname}</span>
              </>
            ),
          },
          {
            title: "推广员身份",
            dataIndex: "level",
            render: (value, promoter) => {
              const levelItem = levelOptions.find(
                (item) => item.value === value
              );
              return (
                <Tag
                  color={
                    levelItem?.scene === promoter.scene
                      ? ["blue", "green", "orange", "red"][value - 1]
                      : "error"
                  }
                >
                  {`${levelItem?.text}${
                    levelItem?.scene !== promoter.scene ? "（身份异常）" : ""
                  }`}
                </Tag>
              );
            },
          },
          {
            title: "推广人数",
            dataIndex: "promotedUserNumber",
          },
          {
            title: "累计佣金",
            dataIndex: "totalCommission",
            render: (value) => <>¥{value.toFixed(2)}</>,
          },
          {
            title: "提现进度",
            render: (value, promoter) => (
              <>
                <Progress
                  percent={Math.round(
                    (promoter.settledCommissionSum / promoter.totalCommission) *
                      100
                  )}
                  size="small"
                  status="active"
                />
              </>
            ),
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Card>
  );
};

const Medal = styled.img`
  margin-left: -0.75rem;
  width: 2.4rem;
  height: 2.4rem;
`;
