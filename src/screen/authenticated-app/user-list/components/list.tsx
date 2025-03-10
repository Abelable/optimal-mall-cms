import {
  Avatar,
  Dropdown,
  MenuProps,
  Modal,
  Popover,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  PageTitle,
  OptionAvatar,
} from "components/lib";
import { UserOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeleteSuperior, useDeleteUser } from "service/user";
import { useBindModal, useUsersQueryKey } from "../util";

import type { SearchPanelProps } from "./search-panel";
import type { User } from "types/user";

interface ListProps extends TableProps<User>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
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

  return (
    <Container>
      <Header between={true}>
        <PageTitle>用户列表</PageTitle>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 1200 }}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
            fixed: "left",
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
            title: "手机号",
            dataIndex: "mobile",
            width: "14rem",
          },
          {
            title: "用户上级",
            dataIndex: "superiorId",
            render: (value) => {
              const option = superiorOptions.find((item) => item.id === value);
              return option ? (
                <Popover content={`id: ${option.id}`}>
                  <div style={{ cursor: "pointer", width: "fit-content" }}>
                    <OptionAvatar src={option.avatar} icon={<UserOutlined />} />
                    <Tag
                      color={
                        ["green", "blue", "gold", "magenta"][option.level - 1]
                      }
                    >
                      {["推广员", "C1", "C2", "C3"][option.level - 1]}
                    </Tag>
                    <span>{option.nickname}</span>
                  </div>
                </Popover>
              ) : (
                <>暂无上级</>
              );
            },
            width: "32rem",
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
              return <More user={user} />;
            },
            width: "8rem",
            fixed: "right",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ user }: { user: User }) => {
  const { open: openBindModal } = useBindModal();
  const { mutate: deleteUser } = useDeleteUser(useUsersQueryKey());
  const { mutate: deleteSuperior } = useDeleteSuperior(useUsersQueryKey());

  const confirmDelete = () => {
    Modal.confirm({
      title: "确定删除该用户吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteUser(user.id),
    });
  };

  const confirmDeleteSuperior = () => {
    Modal.confirm({
      title: "确定删除用户上级吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () =>
        deleteSuperior({ userId: user.id, superiorId: user.superiorId }),
    });
  };

  const items: MenuProps["items"] = user.superiorId
    ? [
        {
          label: <div onClick={() => confirmDelete()}>删除用户</div>,
          key: "delete",
        },
        {
          label: <div onClick={() => openBindModal(user.id)}>更改上级</div>,
          key: "bind",
        },
        {
          label: <div onClick={() => confirmDeleteSuperior()}>删除上级</div>,
          key: "delete_superior",
        },
      ]
    : [
        {
          label: <div onClick={() => confirmDelete()}>删除用户</div>,
          key: "delete",
        },
        {
          label: <div onClick={() => openBindModal(user.id)}>绑定上级</div>,
          key: "bind",
        },
      ];

  return (
    <Dropdown menu={{ items }}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  margin-top: 2.4rem;
  padding: 2.4rem;
  background: #fff;
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
