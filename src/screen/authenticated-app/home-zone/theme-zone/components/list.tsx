import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  InputNumber,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { useDeleteThemeZone, useEditSort } from "service/themeZone";
import { useThemeZoneModal, useThemeZoneListQueryKey } from "../util";
import { PlusOutlined } from "@ant-design/icons";

import type { ThemeZoneListSearchParams, ThemeZone } from "types/themeZone";
import type { Option } from "types/common";

interface ListProps extends TableProps<ThemeZone> {
  sceneOptions: Option[];
  error: Error | unknown;
  params: Partial<ThemeZoneListSearchParams>;
  setParams: (params: Partial<ThemeZoneListSearchParams>) => void;
}

export const List = ({
  sceneOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useThemeZoneModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editSort } = useEditSort(useThemeZoneListQueryKey());

  return (
    <Container>
      <Header between={true}>
        <PageTitle>主题列表</PageTitle>
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
            title: "名称",
            dataIndex: "name",
          },
          {
            title: "封面",
            dataIndex: "cover",
            render: (value) => <Image width={68} src={value} />,
          },
          {
            title: "位置",
            dataIndex: "sort",
            render: (value, themeZone) => (
              <InputNumber
                value={value}
                onChange={(sort) => editSort({ id: themeZone.id, sort })}
              />
            ),
            sorter: (a, b) => a.sort - b.sort,
          },
          {
            title: "跳转场景",
            dataIndex: "scene",
            render: (value) => (
              <>{sceneOptions.find((item) => item.value === +value)?.text}</>
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
  const { startEdit } = useThemeZoneModal();
  const { mutate: deleteCategoty } = useDeleteThemeZone(
    useThemeZoneListQueryKey()
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
    <Dropdown menu={{ items }}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
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
