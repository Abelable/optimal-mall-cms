import {
  Table,
  TablePaginationConfig,
  TableProps,
  Avatar,
  Image,
  Button,
  Modal,
} from "antd";
import { ErrorBox, Row, PageTitle } from "components/lib";
import { UserOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeleteLiveRoom } from "service/liveRoom";
import { useLiveRoomListQueryKey } from "../util";

import type { LiveRoom, LiveRoomListSearchParams } from "types/liveRoom";

interface ListProps extends TableProps<LiveRoom> {
  params: Partial<LiveRoomListSearchParams>;
  setParams: (params: Partial<LiveRoomListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: deleteLiveUser } = useDeleteLiveRoom(
    useLiveRoomListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该直播吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteLiveUser(id),
    });
  };

  return (
    <Container>
      <Header between={true}>
        <PageTitle>直播列表</PageTitle>
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
            title: "状态",
            dataIndex: "status",
            width: "8rem",
            render: (value) => (
              <div style={{ color: ["", "#87d068", "#999", "#1890ff"][value] }}>
                {["", "直播中", "已结束", "预告"][value]}
              </div>
            ),
          },
          {
            title: "封面",
            dataIndex: "cover",
            render: (value) => <Image width={88} src={value} />,
            width: "14rem",
          },
          {
            title: "标题",
            dataIndex: "title",
            width: "24rem",
          },
          {
            title: "直播用户",
            dataIndex: "userInfo",
            render: (value) => (
              <>
                <Avatar
                  size="small"
                  src={value?.avatar}
                  icon={<UserOutlined />}
                />
                <span style={{ marginLeft: "0.6rem" }}>
                  {value?.nickname.length > 8
                    ? `${value?.nickname.slice(0, 8)}...`
                    : value?.nickname}
                </span>
              </>
            ),
            width: "20rem",
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
