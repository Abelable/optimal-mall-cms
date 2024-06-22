import styled from "@emotion/styled";
import {
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { useDeleteOrder } from "service/order";
import { useOrderModal, useOrderListQueryKey } from "../util";
import { SearchPanelProps } from "./search-panel";

import type { Order } from "types/order";

interface ListProps extends TableProps<Order>, SearchPanelProps {
  error: Error | unknown;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (selectedRowKeys: []) => void;
}

export const List = ({
  statusOptions,
  selectedRowKeys,
  setSelectedRowKeys,
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
        <PageTitle>订单列表</PageTitle>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: (selectedRowKeys) =>
            setSelectedRowKeys(selectedRowKeys as []),
        }}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
          },
          {
            title: "订单编号",
            dataIndex: "orderSn",
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value) => (
              <>{statusOptions.find((item) => item.value === value)?.text}</>
            ),
            filters: statusOptions,
            onFilter: (value, order) => order.status === value,
          },
          {
            title: "订单金额",
            dataIndex: "paymentAmount",
            render: (value) => <>¥{value}</>,
          },
          {
            title: "收件人姓名",
            dataIndex: "consignee",
          },
          {
            title: "收件人手机号",
            dataIndex: "mobile",
          },
          {
            title: "创建时间",
            render: (value, order) => (
              <span>
                {order.createdAt
                  ? dayjs(order.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, order) {
              return <More id={order.id} status={order.status} />;
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

const More = ({ id, status }: { id: number; status: number }) => {
  const { open } = useOrderModal();
  const { mutate: deleteOrder } = useDeleteOrder(useOrderListQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该订单吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteOrder(id),
    });
  };

  let items: MenuProps["items"];
  switch (status) {
    case 101:
      items = [
        {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => open(id)}>取消</div>,
          key: "cancel",
        },
      ];
      break;

    case 102:
    case 103:
    case 104:
      items = [
        {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => confirmDelete(id)}>删除</div>,
          key: "delete",
        },
      ];
      break;

    case 201:
      items = [
        {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => open(id)}>发货</div>,
          key: "delivery",
        },
      ];
      break;

    case 301:
      items = [
        {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => open(id)}>物流</div>,
          key: "express",
        },
      ];
      break;

    case 401:
    case 402:
      items = [
        {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => open(id)}>物流</div>,
          key: "express",
        },
        {
          label: <div onClick={() => confirmDelete(id)}>删除</div>,
          key: "delete",
        },
      ];
      break;
  }

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
