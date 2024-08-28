import {
  Button,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
  Tag,
} from "antd";
import { ErrorBox, Row, PageTitle } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeleteActivity } from "service/activity";
import { useActivityModal, useActivityListQueryKey } from "../util";

import type { SearchPanelProps } from "./search-panel";
import type { Goods, GoodsListSearchParams } from "types/activityGoods";

interface ListProps extends TableProps<Goods>, SearchPanelProps {
  params: Partial<GoodsListSearchParams>;
  setParams: (params: Partial<GoodsListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({
  statusOptions,
  typeOptions,
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

  const { mutate: deleteActivity } = useDeleteActivity(
    useActivityListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该活动吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteActivity(id),
    });
  };

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
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
          },
          {
            title: "活动名称",
            dataIndex: "name",
          },
          {
            title: "活动状态",
            dataIndex: "status",
            render: (value) => (
              <div style={{ color: ["#faad14", "#1890ff", "#ff4d4f"][value] }}>
                {statusOptions.find((item) => item.value === value)?.text}
              </div>
            ),
          },
          {
            title: "开始时间",
            dataIndex: "startTime",
            render: (value) => (
              <span>
                {value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "无"}
              </span>
            ),
          },
          {
            title: "结束时间",
            dataIndex: "endTime",
            render: (value) => (
              <span>
                {value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "无"}
              </span>
            ),
          },
          {
            title: "商品信息",
            children: [
              {
                title: "id",
                dataIndex: "goodsId",
              },
              {
                title: "封面",
                dataIndex: "goodsCover",
                render: (value) => <Image width={68} src={value} />,
              },
              {
                title: "名称",
                dataIndex: "goodsName",
              },
              {
                title: "类型",
                dataIndex: "goodsType",
                render: (value) => (
                  <Tag color={value === 1 ? "green" : "volcano"}>
                    {typeOptions.find((item) => item.value === value)?.text}
                  </Tag>
                ),
              },
            ],
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
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
