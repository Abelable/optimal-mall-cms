import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  InputNumber,
  Menu,
  MenuProps,
  Modal,
  Switch,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import {
  useDeleteActivityTag,
  useEditSort,
  useEditStatus,
} from "service/activityTag";
import { useActivityTagModal, useActivityTagListQueryKey } from "../util";
import { PlusOutlined } from "@ant-design/icons";

import type {
  ActivityTagListSearchParams,
  ActivityTag,
} from "types/activityTag";

interface ListProps extends TableProps<ActivityTag> {
  error: Error | unknown;
  params: Partial<ActivityTagListSearchParams>;
  setParams: (params: Partial<ActivityTagListSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useActivityTagModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editSort } = useEditSort(useActivityTagListQueryKey());
  const { mutate: editStatus } = useEditStatus(useActivityTagListQueryKey());

  return (
    <Container>
      <Header between={true}>
        <PageTitle>活动标签</PageTitle>
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
            title: "标签名称",
            dataIndex: "name",
          },
          {
            title: "排序",
            dataIndex: "sort",
            render: (value, activityTag) => (
              <InputNumber
                value={value}
                onChange={(sort) => editSort({ id: activityTag.id, sort })}
              />
            ),
            sorter: (a, b) => a.sort - b.sort,
          },
          {
            title: "显示",
            dataIndex: "status",
            render: (value, activityTag) => (
              <Switch
                checked={value === 1}
                onChange={(truthy) =>
                  editStatus({ id: activityTag.id, status: truthy ? 1 : 2 })
                }
              />
            ),
          },
          {
            title: "操作",
            render(value, role) {
              return <More id={role.id} />;
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

const More = ({ id }: { id: number }) => {
  const { startEdit } = useActivityTagModal();
  const { mutate: deleteCategoty } = useDeleteActivityTag(
    useActivityTagListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该活动标签吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteCategoty(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(id)}>编辑</div>,
      key: "edit",
    },
    {
      label: <div onClick={() => confirmDelete(id)}>删除</div>,
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
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
