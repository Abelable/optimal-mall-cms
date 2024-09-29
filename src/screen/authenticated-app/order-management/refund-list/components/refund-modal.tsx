import {
  Descriptions,
  Divider,
  Drawer,
  Image,
  Card,
  Button,
  Table,
} from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import { useRefundModal, useShippingModal } from "../util";

import type { Option } from "types/common";
import { Goods } from "types/refund";

export const RefundModal = ({ statusOptions }: { statusOptions: Option[] }) => {
  const { close, refundModalOpen, refundInfo, error, isLoading } =
    useRefundModal();

  return (
    <Drawer
      forceRender={true}
      title="订单详情"
      width={"120rem"}
      onClose={close}
      open={refundModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Card
            title={`当前订单状态：${
              statusOptions.find((item) => item.value === refundInfo?.status)
                ?.text
            }`}
            style={{ marginTop: "24px" }}
            extra={
              <Extra
                id={refundInfo?.id || 0}
                status={refundInfo?.status || 0}
              />
            }
          >
            <Divider orientation="left">基本信息</Divider>
            <Descriptions size={"small"} layout="vertical" bordered>
              <Descriptions.Item label="订单编号">
                {refundInfo?.orderSn}
              </Descriptions.Item>
              <Descriptions.Item label="快递公司">
                {refundInfo?.shipChannel || "暂无"}
              </Descriptions.Item>
              <Descriptions.Item label="物流单号">
                {refundInfo?.shipSn || "暂无"}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">商品信息</Divider>
            {/* <Table
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
              dataSource={[refundInfo?.goodsInfo as Goods]}
              pagination={false}
              bordered
            /> */}

            <Divider orientation="left">费用信息</Divider>
            <Descriptions size={"small"} layout="vertical" column={4} bordered>
              <Descriptions.Item label="商品合计">
                ¥{refundInfo?.refundAmount}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </>
      )}
    </Drawer>
  );
};

const Extra = ({ id, status }: { id: number; status: number }) => {
  const { open: openShippingModal } = useShippingModal();

  switch (status) {
    case 2:
      return (
        <Button onClick={() => openShippingModal(id)} type={"primary"}>
          查看物流
        </Button>
      );

    default:
      return <></>;
  }
};
