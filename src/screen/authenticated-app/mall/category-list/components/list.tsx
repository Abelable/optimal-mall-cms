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
  useDeleteCategory,
  useEditSort,
  useEditStatus,
} from "service/category";
import { useCategoryModal, useCategoriesQueryKey } from "../util";
import { PlusOutlined } from "@ant-design/icons";

import type { CategoriesSearchParams, Category } from "types/category";

interface ListProps extends TableProps<Category> {
  error: Error | unknown;
  params: Partial<CategoriesSearchParams>;
  setParams: (params: Partial<CategoriesSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useCategoryModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editSort } = useEditSort(useCategoriesQueryKey());
  const { mutate: editStatus } = useEditStatus(useCategoriesQueryKey());

  return (
    <Container>
      <Header between={true}>
        <PageTitle>商品分类</PageTitle>
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
            title: "分类名称",
            dataIndex: "name",
          },
          {
            title: "排序",
            dataIndex: "sort",
            render: (value, category) => (
              <InputNumber
                value={value}
                onChange={(sort) => editSort({ id: category.id, sort })}
              />
            ),
            sorter: (a, b) => a.sort - b.sort,
          },
          {
            title: "显示",
            dataIndex: "status",
            render: (value, category) => (
              <Switch
                checked={value === 1}
                onChange={(truthy) =>
                  editStatus({ id: category.id, status: truthy ? 1 : 2 })
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
  const { startEdit } = useCategoryModal();
  const { mutate: deleteRole } = useDeleteCategory(useCategoriesQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该商品分类吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteRole(id),
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
