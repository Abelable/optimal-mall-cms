import {
  Descriptions,
  Divider,
  Drawer,
  Image,
  Steps,
  Card,
  Button,
  Modal,
  Table,
} from "antd";
import { ErrorBox, ModalLoading } from "components/lib";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useCancelOrder, useDeleteOrder } from "service/order";
import { useOrderListQueryKey, useOrderModal } from "../util";

import type { Option } from "types/common";

const { Step } = Steps;

export const OrderModal = ({ statusOptions }: { statusOptions: Option[] }) => {
  const { close, orderModalOpen, orderInfo, error, isLoading } =
    useOrderModal();
  const [current, setCurrent] = useState(1);
  const [stepItems, setStepItems] = useState<
    { title: string; description: String }[]
  >([]);

  useEffect(() => {
    if (orderInfo) {
      const {
        status,
        payTime = "",
        shipTime = "",
        confirmTime = "",
        finishTime = "",
      } = orderInfo;
      switch (status) {
        case 101:
          setCurrent(1);
          setStepItems([
            {
              title: "提交订单",
              description: dayjs(orderInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            { title: "支付订单", description: "" },
            { title: "平台发货", description: "" },
            { title: "确认收货", description: "" },
            { title: "完成评价", description: "" },
          ]);
          break;

        case 201:
          setCurrent(2);
          setStepItems([
            {
              title: "提交订单",
              description: dayjs(orderInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            { title: "支付订单", description: payTime },
            { title: "平台发货", description: "" },
            { title: "确认收货", description: "" },
            { title: "完成评价", description: "" },
          ]);
          break;

        case 301:
          setCurrent(3);
          setStepItems([
            {
              title: "提交订单",
              description: dayjs(orderInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            { title: "支付订单", description: payTime },
            { title: "平台发货", description: shipTime },
            { title: "确认收货", description: "" },
            { title: "完成评价", description: "" },
          ]);
          break;

        case 401:
          setCurrent(4);
          setStepItems([
            {
              title: "提交订单",
              description: dayjs(orderInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            { title: "支付订单", description: payTime },
            { title: "平台发货", description: shipTime },
            { title: "用户确认", description: confirmTime },
            { title: "完成评价", description: "" },
          ]);
          break;

        case 402:
          setCurrent(4);
          setStepItems([
            {
              title: "提交订单",
              description: dayjs(orderInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            { title: "支付订单", description: payTime },
            { title: "平台发货", description: shipTime },
            { title: "系统确认", description: confirmTime },
            { title: "完成评价", description: "" },
          ]);
          break;

        case 501:
          setCurrent(5);
          setStepItems([
            {
              title: "提交订单",
              description: dayjs(orderInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            { title: "支付订单", description: payTime },
            { title: "平台发货", description: shipTime },
            { title: "确认收货", description: confirmTime },
            { title: "完成评价", description: finishTime },
          ]);
          break;

        case 102:
          setCurrent(2);
          setStepItems([
            {
              title: "提交订单",
              description: dayjs(orderInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            { title: "用户取消", description: finishTime },
          ]);
          break;

        case 103:
          setCurrent(2);
          setStepItems([
            {
              title: "提交订单",
              description: dayjs(orderInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            { title: "系统取消", description: finishTime },
          ]);
          break;

        case 104:
          setCurrent(2);
          setStepItems([
            {
              title: "提交订单",
              description: dayjs(orderInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            { title: "管理员取消", description: finishTime },
          ]);
          break;
      }
    }
  }, [orderInfo]);

  return (
    <Drawer
      forceRender={true}
      title="订单详情"
      width={"120rem"}
      onClose={close}
      open={orderModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Steps current={current}>
            {stepItems.map(({ title, description }) => (
              <Step key={title} title={title} description={description} />
            ))}
          </Steps>
          <Card
            title={`当前订单状态：${
              statusOptions.find((item) => item.value === orderInfo?.status)
                ?.text
            }`}
            style={{ marginTop: "24px" }}
            extra={
              <Extra id={orderInfo?.id || 0} status={orderInfo?.status || 0} />
            }
          >
            <Divider orientation="left">基本信息</Divider>
            <Descriptions size={"small"} layout="vertical" bordered>
              <Descriptions.Item label="订单编号">
                {orderInfo?.orderSn}
              </Descriptions.Item>
              <Descriptions.Item label="快递公司">
                {orderInfo?.shipChannel || "暂无"}
              </Descriptions.Item>
              <Descriptions.Item label="物流单号">
                {orderInfo?.shipSn || "暂无"}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">收货人信息</Divider>
            <Descriptions size={"small"} layout="vertical" bordered>
              <Descriptions.Item label="收货人">
                {orderInfo?.consignee}
              </Descriptions.Item>
              <Descriptions.Item label="手机号">
                {orderInfo?.mobile}
              </Descriptions.Item>
              <Descriptions.Item label="收货地址">
                {orderInfo?.address}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">商品信息</Divider>
            <Table
              rowKey={"id"}
              columns={[
                {
                  title: "商品图片",
                  dataIndex: "cover",
                  render: (value) => <Image width={68} src={value} />,
                },
                { title: "商品名称", dataIndex: "name" },
                {
                  title: "商品规格",
                  dataIndex: "selectedSkuName",
                  render: (value) => <>规格：{value}</>,
                },
                {
                  title: "价格",
                  dataIndex: "price",
                  render: (value) => <>¥{value}</>,
                },
                {
                  title: "数量",
                  dataIndex: "number",
                },
                {
                  title: "小计",
                  render: (value, goods) => <>¥{goods.price * goods.number}</>,
                },
              ]}
              dataSource={orderInfo?.goodsList}
              pagination={false}
              bordered
            />

            <Divider orientation="left">费用信息</Divider>
            <Descriptions size={"small"} layout="vertical" column={4} bordered>
              <Descriptions.Item label="商品合计">
                ¥{orderInfo?.goodsPrice}
              </Descriptions.Item>
              <Descriptions.Item label="优惠券抵扣">
                -¥{orderInfo?.couponDenomination}
              </Descriptions.Item>
              <Descriptions.Item label="运费">
                ¥{orderInfo?.freightPrice}
              </Descriptions.Item>
              <Descriptions.Item label="订单总金额">
                <span style={{ color: "#f56c6c" }}>
                  {" "}
                  ¥{orderInfo?.paymentAmount}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </>
      )}
    </Drawer>
  );
};

const Extra = ({ id, status }: { id: number; status: number }) => {
  const { mutate: cancelOrder } = useCancelOrder(useOrderListQueryKey());
  const { mutate: deleteOrder } = useDeleteOrder(useOrderListQueryKey());

  const confirmCancel = () => {
    Modal.confirm({
      title: "确定取消该订单吗？",
      content: "点击确定取消",
      okText: "确定",
      cancelText: "取消",
      onOk: () => cancelOrder([id]),
    });
  };
  const confirmDelete = () => {
    Modal.confirm({
      title: "确定删除该订单吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteOrder([id]),
    });
  };

  switch (status) {
    case 101:
      return (
        <Button onClick={() => confirmCancel()} type={"primary"} danger>
          取消订单
        </Button>
      );

    case 102:
    case 103:
    case 104:
      return (
        <Button onClick={() => confirmDelete()} type={"primary"} danger>
          删除订单
        </Button>
      );

    case 201:
      return (
        <Button onClick={() => confirmCancel()} type={"primary"}>
          订单发货
        </Button>
      );

    case 301:
    case 401:
    case 402:
    case 501:
      return (
        <Button onClick={() => confirmCancel()} type={"primary"}>
          查看物流
        </Button>
      );

    default:
      return <></>;
  }
};
