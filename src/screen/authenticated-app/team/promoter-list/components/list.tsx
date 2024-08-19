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
import type { User } from "types/user";

interface ListProps extends TableProps<User>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  levelOptions,
  superiorOptions,
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
        <PageTitle>推官员列表</PageTitle>
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
            title: "昵称",
            dataIndex: "nickname",
          },
          {
            title: "手机号",
            dataIndex: "mobile",
          },
          {
            title: "性别",
            dataIndex: "gender",
            render: (value) => (
              <>{value === 1 ? "男" : value === 2 ? "女" : "未知"}</>
            ),
            filters: [
              { text: "未知", value: 0 },
              { text: "男", value: 1 },
              { text: "女", value: 2 },
            ],
            onFilter: (value, user) => user.gender === value,
          },
          {
            title: "用户身份",
            dataIndex: "level",
            render: (value) => (
              <Tag color="geekblue">
                {levelOptions.find((item) => item.value === value)?.text}
              </Tag>
            ),
          },
          {
            title: "注册时间",
            render: (value, user) => (
              <span>
                {user.createdAt
                  ? dayjs(user.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, user) {
              return (
                <Button
                  onClick={() => confirmDelete(user.id)}
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
