import {
  Button,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
  Dropdown,
  Menu,
  MenuProps,
  InputNumber,
  Select,
} from "antd";
import { ErrorBox, Row, PageTitle, ButtonNoPadding } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import {
  useDeleteActivity,
  useEditFollowers,
  useEditGoodsTag,
  useEditSales,
  useEditSort,
  useEditTag,
  useEndActivity,
} from "service/activity";
import { useActivityModal, useActivityListQueryKey } from "../util";

import type { SearchPanelProps } from "./search-panel";
import type { Activity, ActivityListSearchParams } from "types/activity";

interface ListProps extends TableProps<Activity>, SearchPanelProps {
  params: Partial<ActivityListSearchParams>;
  setParams: (params: Partial<ActivityListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({
  statusOptions,
  tagOptions,
  goodsTagOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useActivityModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editTag } = useEditTag(useActivityListQueryKey());
  const { mutate: editGoodsTag } = useEditGoodsTag(useActivityListQueryKey());
  const { mutate: editFollowers } = useEditFollowers(useActivityListQueryKey());
  const { mutate: editSales } = useEditSales(useActivityListQueryKey());
  const { mutate: editSort } = useEditSort(useActivityListQueryKey());

  return (
    <Container>
      <Header between={true}>
        <PageTitle>活动列表</PageTitle>
        <Button onClick={() => open()} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 2000 }}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
            fixed: "left",
          },
          {
            title: "活动名称",
            dataIndex: "name",
            width: "14rem",
          },
          {
            title: "活动标签",
            dataIndex: "tag",
            width: "16.3rem",
            render: (value, activity) => (
              <Select
                style={{ width: "13rem" }}
                value={value || undefined}
                onSelect={(tag: number) => editTag({ id: activity.id, tag })}
                onClear={() => editTag({ id: activity.id, tag: 0 })}
                allowClear
                placeholder="设置活动标签"
              >
                {tagOptions?.map(({ text, value }) => (
                  <Select.Option key={value} value={value}>
                    {text}
                  </Select.Option>
                ))}
              </Select>
            ),
          },
          {
            title: "商品标签",
            dataIndex: "goodsTag",
            width: "16.3rem",
            render: (value, activity) => (
              <Select
                style={{ width: "13rem" }}
                value={value || undefined}
                onSelect={(goodsTag: number) =>
                  editGoodsTag({ id: activity.id, goodsTag })
                }
                onClear={() => editGoodsTag({ id: activity.id, goodsTag: 0 })}
                allowClear
                placeholder="设置商品标签"
              >
                {goodsTagOptions?.map(({ text, value }) => (
                  <Select.Option key={value} value={value}>
                    {text}
                  </Select.Option>
                ))}
              </Select>
            ),
          },
          {
            title: "活动状态",
            dataIndex: "status",
            width: "9rem",
            render: (value) => (
              <div style={{ color: ["#faad14", "#1890ff", "#ff4d4f"][value] }}>
                {statusOptions.find((item) => item.value === value)?.text}
              </div>
            ),
          },
          {
            title: "商品信息",
            children: [
              {
                title: "id",
                dataIndex: "goodsId",
                width: "8rem",
              },
              {
                title: "封面",
                dataIndex: "goodsCover",
                width: "12rem",
                render: (value) => <Image width={68} src={value} />,
              },
              {
                title: "名称",
                dataIndex: "goodsName",
                width: "30rem",
              },
            ],
          },
          {
            title: "活动关注数",
            dataIndex: "followers",
            width: "12rem",
            render: (value, activity) => (
              <InputNumber
                value={value}
                onChange={(followers) =>
                  editFollowers({ id: activity.id, followers })
                }
              />
            ),
          },
          {
            title: "活动销量",
            dataIndex: "sales",
            width: "12rem",
            render: (value, activity) => (
              <InputNumber
                value={value}
                onChange={(sales) => editSales({ id: activity.id, sales })}
              />
            ),
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
            title: "开始时间",
            dataIndex: "startTime",
            width: "20rem",
            render: (value) => (
              <span>
                {value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "无"}
              </span>
            ),
          },
          {
            title: "结束时间",
            dataIndex: "endTime",
            width: "20rem",
            render: (value) => (
              <span>
                {value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "无"}
              </span>
            ),
          },
          {
            title: "操作",
            render(value, goods) {
              return <More id={goods.id} status={goods.status} />;
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

const More = ({ id, status }: { id: number; status: number }) => {
  const { startEdit } = useActivityModal();
  const { mutate: deleteActivity } = useDeleteActivity(
    useActivityListQueryKey()
  );
  const { mutate: endActivity } = useEndActivity(useActivityListQueryKey());

  const confirmEnd = (id: number) => {
    Modal.confirm({
      title: "确定结束该活动吗？",
      content: "点击确定结束",
      okText: "确定",
      cancelText: "取消",
      onOk: () => endActivity(id),
    });
  };

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该活动吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteActivity(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(id)}>编辑</div>,
      key: "edit",
    },
    {
      label: <div onClick={() => confirmEnd(id)}>结束</div>,
      key: "end",
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
