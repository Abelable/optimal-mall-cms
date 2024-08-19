import {
  Avatar,
  Button,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { ErrorBox, Row, PageTitle } from "components/lib";
import { UserOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeletePromoter } from "service/promoter";
import { usePromoterListQueryKey } from "../util";

import type { SearchPanelProps } from "./search-panel";
import type { Promoter } from "types/promoter";

interface ListProps extends TableProps<Promoter>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  levelOptions,
  error,
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

  const { mutate: deletePromoter } = useDeletePromoter(
    usePromoterListQueryKey()
  );
  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该用户吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deletePromoter(id),
    });
  };

  return (
    <Container>
      <Header between={true}>
        <PageTitle>推广员列表</PageTitle>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
          },
          {
            title: "头像",
            dataIndex: "avatar",
            render: (value) => <Avatar src={value} icon={<UserOutlined />} />,
          },
          {
            title: "推广员身份",
            dataIndex: "level",
            render: (value) => (
              <Tag color="geekblue">
                {levelOptions.find((item) => item.value === value)?.text}
              </Tag>
            ),
          },
          {
            title: "创建时间",
            render: (value, promoter) => (
              <span>
                {promoter.createdAt
                  ? dayjs(promoter.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "创建时间",
            render: (value, promoter) => (
              <span>
                {promoter.updatedAt
                  ? dayjs(promoter.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, promoter) {
              return (
                <Button
                  onClick={() => confirmDelete(promoter.id)}
                  type="link"
                  danger
                >
                  删除
                </Button>
              );
            },
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2.4rem;
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
