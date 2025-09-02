import {
  Button,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Avatar,
} from "antd";
import { ErrorBox, Row, PageTitle } from "components/lib";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeleteLiveUser } from "service/liveUser";
import { useLiveUserModal, useLiveUserListQueryKey } from "../util";

import type { LiveUser, LiveUserListSearchParams } from "types/liveUser";

interface ListProps extends TableProps<LiveUser> {
  params: Partial<LiveUserListSearchParams>;
  setParams: (params: Partial<LiveUserListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useLiveUserModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: deleteLiveUser } = useDeleteLiveUser(
    useLiveUserListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该人员吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteLiveUser(id),
    });
  };

  return (
    <Container>
      <Header between={true}>
        <PageTitle>直播用户</PageTitle>
        <Button onClick={() => open()} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
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
            title: "用户id",
            dataIndex: "userId",
            width: "8rem",
          },
          {
            title: "头像",
            dataIndex: "avatar",
            render: (value) => <Avatar src={value} icon={<UserOutlined />} />,
            width: "6.8rem",
          },
          {
            title: "昵称",
            dataIndex: "nickname",
            width: "32rem",
          },
          {
            title: "创建时间",
            render: (value, goods) => (
              <span>
                {goods.createdAt
                  ? dayjs(goods.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, goods) {
              return (
                <Button
                  onClick={() => confirmDelete(goods.id)}
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
  padding: 2.4rem;
  background: #fff;
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
