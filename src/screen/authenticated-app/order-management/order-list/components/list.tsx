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
import { useCancelOrder, useConfirmOrder, useDeleteOrder } from "service/order";
import {
  useOrderModal,
  useOrderListQueryKey,
  useDeliveryModal,
  useShippingModal,
} from "../util";
import { SearchPanelProps } from "./search-panel";

import type { Order } from "types/order";

interface ListProps extends TableProps<Order>, SearchPanelProps {
  error: Error | unknown;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (selectedRowKeys: []) => void;
}

export const List = ({
  statusOptions,
  merchantOptions,
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
        scroll={{ x: 2000 }}
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
            fixed: "left",
          },
          {
            title: "订单编号",
            dataIndex: "orderSn",
            width: "21rem",
          },
          {
            title: "订单状态",
            dataIndex: "status",
            render: (value) => (
              <div style={{ color: value === 201 ? "#faad14" : "#000" }}>
                {statusOptions.find((item) => item.value === value)?.text}
              </div>
            ),
            filters: statusOptions,
            onFilter: (value, order) => order.status === value,
            width: "12rem",
          },
          {
            title: "订单金额",
            dataIndex: "paymentAmount",
            render: (value) => <>¥{value}</>,
            width: "12rem",
          },
          {
            title: "商家",
            dataIndex: "merchantId",
            render: (value) => (
              <>{merchantOptions.find((item) => item.id === value)?.name}</>
            ),
            width: "32rem",
          },
          {
            title: "收件人信息",
            children: [
              {
                title: "姓名",
                dataIndex: "consignee",
                width: "12rem",
              },
              {
                title: "手机号",
                dataIndex: "mobile",
                width: "14rem",
              },
              {
                title: "收件地址",
                dataIndex: "address",
              },
            ],
          },
          {
            title: "提交时间",
            render: (value, order) => (
              <span>
                {order.createdAt
                  ? dayjs(order.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
            width: "20rem",
          },
          {
            title: "处理时间",
            render: (value, refund) => (
              <span>
                {refund.updatedAt
                  ? dayjs(refund.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
            width: "20rem",
          },
          {
            title: "操作",
            render(value, order) {
              return <More id={order.id} status={order.status} />;
            },
            fixed: "right",
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
  const { open: openOrderModal } = useOrderModal();
  const { open: openDeliveryModal } = useDeliveryModal();
  const { open: openShippingModal } = useShippingModal();
  const { mutate: cancelOrder } = useCancelOrder(useOrderListQueryKey());
  const { mutate: confirmOrder } = useConfirmOrder(useOrderListQueryKey());
  const { mutate: deleteOrder } = useDeleteOrder(useOrderListQueryKey());

  const confirmCancel = (id: number) => {
    Modal.confirm({
      title: "确定取消该订单吗？",
      content: "点击确定取消",
      okText: "确定",
      cancelText: "取消",
      onOk: () => cancelOrder([id]),
    });
  };

  const confirmReceived = (id: number) => {
    Modal.confirm({
      title: "确认收货之前，请核实物流信息",
      content: "点击确定确认已收货",
      okText: "确定",
      cancelText: "取消",
      onOk: () => confirmOrder([id]),
    });
  };

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该订单吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteOrder([id]),
    });
  };

  let items: MenuProps["items"];
  switch (status) {
    case 101:
      items = [
        {
          label: <div onClick={() => openOrderModal(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => confirmCancel(id)}>取消</div>,
          key: "cancel",
        },
      ];
      break;

    case 102:
    case 103:
    case 104:
      items = [
        {
          label: <div onClick={() => openOrderModal(id)}>详情</div>,
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
          label: <div onClick={() => openOrderModal(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => openDeliveryModal(id)}>发货</div>,
          key: "delivery",
        },
      ];
      break;

    case 301:
    case 401:
    case 402:
    case 501:
      items = [
        {
          label: <div onClick={() => openOrderModal(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => openShippingModal(id)}>物流</div>,
          key: "express",
        },
        {
          label: <div onClick={() => confirmReceived(id)}>确认收货</div>,
          key: "confirm",
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
