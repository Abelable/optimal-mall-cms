import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { ErrorBox, Row, PageTitle, ButtonNoPadding } from "components/lib";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeletePromoter } from "service/promoter";
import { usePromoterModal, usePromoterListQueryKey } from "../util";

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
  const { open } = usePromoterModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>推广员列表</PageTitle>
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
            title: "推广员身份",
            dataIndex: "level",
            render: (value) => (
              <Tag color="geekblue">
                {levelOptions.find((item) => item.value === value)?.text}
              </Tag>
            ),
          },
          {
            title: "场景值",
            dataIndex: "scene",
            render: (value, promoter) => (
              <>
                {value ===
                levelOptions.find((item) => item.value === promoter.level)
                  ?.scene ? (
                  <Tag color="success">{value}</Tag>
                ) : (
                  <Tag color="error">{value}（场景值错误）</Tag>
                )}
              </>
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
            title: "更新时间",
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
              return <More promoter={promoter} />;
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

const More = ({ promoter }: { promoter: Promoter }) => {
  const { startEdit } = usePromoterModal();

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

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(promoter.id)}>更改等级</div>,
      key: "change",
    },
    {
      label: <div onClick={() => confirmDelete(promoter.id)}>删除</div>,
      key: "delete",
    },
  ];

  return (
    <Dropdown overlay={<Menu items={items} />}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
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
