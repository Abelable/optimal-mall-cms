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
  Avatar,
} from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import { UserOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useCancelOrder, useDeleteOrder } from "service/order";
import {
  useDeliveryModal,
  useOrderListQueryKey,
  useOrderModal,
  useShippingModal,
} from "../util";

import type { OperatorOption, Option } from "types/common";
import { PackageGoods } from "types/order";
import styled from "@emotion/styled";

const { Step } = Steps;

export const OrderModal = ({
  statusOptions,
  merchantOptions,
  userOptions,
}: {
  statusOptions: Option[];
  merchantOptions: OperatorOption[];
  userOptions: { id: number; avatar: string; nickname: string }[];
}) => {
  const { close, orderModalOpen, orderInfo, error, isLoading } =
    useOrderModal();
  const [current, setCurrent] = useState(1);
  const [stepItems, setStepItems] = useState<
    { title: string; description: String }[]
  >([]);

  const { open: openShippingModal } = useShippingModal();

  useEffect(() => {
    if (orderInfo) {
      const {
        status,
        deliveryMode,
        payTime = "",
        shipTime = "",
        confirmTime = "",
        finishTime = "",
      } = orderInfo;
      switch (status) {
        case 101:
          setCurrent(1);
          setStepItems(
            deliveryMode === 1
              ? [
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
                ]
              : [
                  {
                    title: "提交订单",
                    description: dayjs(orderInfo?.createdAt).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                  },
                  { title: "支付订单", description: "" },
                  { title: "核销使用", description: "" },
                  { title: "完成评价", description: "" },
                ]
          );
          break;

        case 201:
        case 204:
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

        case 302:
          setCurrent(2);
          setStepItems([
            {
              title: "提交订单",
              description: dayjs(orderInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            },
            { title: "支付订单", description: payTime },
            { title: "核销使用", description: "" },
            { title: "完成评价", description: "" },
          ]);
          break;

        case 401:
          setCurrent(deliveryMode === 1 ? 4 : 3);
          setStepItems(
            deliveryMode === 1
              ? [
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
                ]
              : [
                  {
                    title: "提交订单",
                    description: dayjs(orderInfo?.createdAt).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                  },
                  { title: "支付订单", description: payTime },
                  { title: "用户使用", description: confirmTime },
                  { title: "完成评价", description: "" },
                ]
          );
          break;

        case 402:
          setCurrent(deliveryMode === 1 ? 4 : 3);
          setStepItems(
            deliveryMode === 1
              ? [
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
                ]
              : [
                  {
                    title: "提交订单",
                    description: dayjs(orderInfo?.createdAt).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                  },
                  { title: "支付订单", description: payTime },
                  { title: "系统确认", description: confirmTime },
                  { title: "完成评价", description: "" },
                ]
          );
          break;

        case 403:
          setCurrent(deliveryMode === 1 ? 4 : 3);
          setStepItems(
            deliveryMode === 1
              ? [
                  {
                    title: "提交订单",
                    description: dayjs(orderInfo?.createdAt).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                  },
                  { title: "支付订单", description: payTime },
                  { title: "平台发货", description: shipTime },
                  { title: "管理员确认", description: confirmTime },
                  { title: "完成评价", description: "" },
                ]
              : [
                  {
                    title: "提交订单",
                    description: dayjs(orderInfo?.createdAt).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                  },
                  { title: "支付订单", description: payTime },
                  { title: "管理员确认", description: confirmTime },
                  { title: "完成评价", description: "" },
                ]
          );
          break;

        case 501:
        case 502:
          setCurrent(deliveryMode === 1 ? 5 : 4);
          setStepItems(
            deliveryMode === 1
              ? [
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
                ]
              : [
                  {
                    title: "提交订单",
                    description: dayjs(orderInfo?.createdAt).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                  },
                  { title: "支付订单", description: payTime },
                  { title: "用户使用", description: confirmTime },
                  { title: "完成评价", description: finishTime },
                ]
          );
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
      styles={{ body: { paddingBottom: 80 } }}
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
            title={
              <>
                <span>当前订单状态：</span>
                <span style={{ color: "#1890ff" }}>{`${
                  statusOptions.find((item) => item.value === orderInfo?.status)
                    ?.text
                }`}</span>
              </>
            }
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
              <Descriptions.Item label="商家">
                {
                  merchantOptions.find(
                    (item) => item.id === orderInfo?.merchantId
                  )?.name
                }
              </Descriptions.Item>
              <Descriptions.Item label="下单用户">
                <>
                  <Avatar
                    size="small"
                    src={
                      userOptions.find((item) => item.id === orderInfo?.userId)
                        ?.avatar
                    }
                    icon={<UserOutlined />}
                  />
                  <span style={{ marginLeft: "0.6rem" }}>
                    {
                      userOptions.find((item) => item.id === orderInfo?.userId)
                        ?.nickname
                    }
                  </span>
                </>
              </Descriptions.Item>
            </Descriptions>

            {orderInfo?.deliveryMode === 1 &&
            [204, 301, 401, 402, 403, 501, 502].includes(
              orderInfo?.status as number
            ) ? (
              <>
                <Divider orientation="left">包裹信息</Divider>
                <Table
                  rowKey={"id"}
                  columns={[
                    {
                      title: "包裹商品",
                      dataIndex: "goodsList",
                      render: (value) => (
                        <>
                          {value.map(
                            ({
                              goodsId,
                              goodsCover,
                              goodsName,
                              goodsNumber,
                            }: Partial<PackageGoods>) => (
                              <GoodsItem key={goodsId}>
                                <GoodsCover src={goodsCover} alt="" />
                                <GoodsName>{goodsName}</GoodsName>
                                <div>x{goodsNumber}</div>
                              </GoodsItem>
                            )
                          )}
                        </>
                      ),
                      width: "400px",
                    },
                    { title: "快递公司", dataIndex: "shipChannel" },
                    {
                      title: "物流单号",
                      dataIndex: "shipSn",
                    },
                    {
                      title: "操作",
                      render(value, _package) {
                        return (
                          <Button
                            onClick={() => openShippingModal(_package?.id)}
                            type={"primary"}
                          >
                            查看物流
                          </Button>
                        );
                      },
                      fixed: "right",
                      width: "8rem",
                    },
                  ]}
                  dataSource={
                    orderInfo?.packageList?.length
                      ? orderInfo?.packageList
                      : orderInfo?.shipChannel
                      ? [
                          {
                            id: orderInfo?.id as number,
                            shipChannel: orderInfo?.shipChannel || "",
                            shipSn: orderInfo?.shipSn || "",
                            goodsList:
                              orderInfo?.goodsList?.map(
                                ({
                                  goodsId,
                                  cover: goodsCover,
                                  name: goodsName,
                                  number: goodsNumber,
                                }) => ({
                                  goodsId,
                                  goodsCover,
                                  goodsName,
                                  goodsNumber,
                                })
                              ) || [],
                          },
                        ]
                      : []
                  }
                  pagination={false}
                  bordered
                />
              </>
            ) : (
              <></>
            )}
            {orderInfo?.deliveryMode === 1 ? (
              <>
                <Divider orientation="left">收件人信息</Divider>
                <Descriptions size={"small"} layout="vertical" bordered>
                  <Descriptions.Item label="收件人">
                    {orderInfo?.consignee}
                  </Descriptions.Item>
                  <Descriptions.Item label="手机号">
                    {orderInfo?.mobile}
                  </Descriptions.Item>
                  <Descriptions.Item label="收货地址">
                    {orderInfo?.address}
                  </Descriptions.Item>
                </Descriptions>
              </>
            ) : (
              <>
                <Divider orientation="left">自提信息</Divider>
                <Descriptions
                  size={"small"}
                  layout="vertical"
                  bordered
                  column={4}
                >
                  <Descriptions.Item label="自提点">
                    <div>
                      {orderInfo?.pickupAddress?.name ||
                        orderInfo?.pickupAddress?.addressDetail}
                    </div>
                    {orderInfo?.pickupAddress?.name ? (
                      <div style={{ color: "#999", fontSize: "1.2rem" }}>
                        {orderInfo?.pickupAddress?.addressDetail}
                      </div>
                    ) : (
                      <></>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="自提时间">
                    {orderInfo?.pickupTime}
                  </Descriptions.Item>
                  <Descriptions.Item label="预留手机号">
                    {orderInfo?.pickupMobile}
                  </Descriptions.Item>
                  <Descriptions.Item label="核销编码">
                    {orderInfo?.verifyCode}
                  </Descriptions.Item>
                </Descriptions>
              </>
            )}

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
                  render: (value, goods) => (
                    <>¥{(goods.price * goods.number).toFixed(2)}</>
                  ),
                },
              ]}
              dataSource={orderInfo?.goodsList}
              pagination={false}
              bordered
            />

            <Divider orientation="left">费用信息</Divider>
            <Descriptions size={"small"} layout="vertical" column={5} bordered>
              <Descriptions.Item label="商品合计">
                ¥{orderInfo?.goodsPrice}
              </Descriptions.Item>
              <Descriptions.Item label="运费">
                ¥{orderInfo?.freightPrice}
              </Descriptions.Item>
              <Descriptions.Item label="优惠券抵扣">
                -¥{orderInfo?.couponDenomination}
              </Descriptions.Item>
              <Descriptions.Item label="余额抵扣">
                -¥{orderInfo?.deductionBalance}
              </Descriptions.Item>
              <Descriptions.Item label="实付金额">
                <span style={{ color: "#f56c6c" }}>
                  {" "}
                  ¥{orderInfo?.refundAmount}
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
  const { open: openDeliveryModal } = useDeliveryModal();
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
    case 204:
      return (
        <Button onClick={() => openDeliveryModal(id)} type={"primary"}>
          订单发货
        </Button>
      );

    default:
      return <></>;
  }
};

const GoodsItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  padding: 6px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  :last-child {
    margin-bottom: 0;
  }
`;
const GoodsCover = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 4px;
`;
const GoodsName = styled.div`
  margin: 0 6px;
  flex: 1;
  font-weight: bold;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;
