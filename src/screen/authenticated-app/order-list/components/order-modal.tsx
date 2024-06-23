import { Descriptions, Divider, Drawer, Image, Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useOrderModal } from "../util";

import type { Option } from "types/common";

export const OrderModal = ({ statusOptions }: { statusOptions: Option[] }) => {
  const { close, orderModalOpen, editingOrder, error, isLoading } =
    useOrderModal();

  return (
    <Drawer
      forceRender={true}
      title="商品详情"
      size={"large"}
      onClose={close}
      open={orderModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Divider orientation="left">商品信息</Divider>
          {/* <Descriptions size={"small"} column={2}>
            <Descriptions.Item label="ID">{editingOrder?.id}</Descriptions.Item>
            <Descriptions.Item label="状态">
              {editingOrder?.status === 0 ? (
                <span style={{ color: "#87d068" }}>待审核</span>
              ) : editingOrder?.status === 1 ? (
                <span style={{ color: "#296BEF", cursor: "pointer" }}>
                  售卖中
                </span>
              ) : (
                <Tooltip title={editingOrder?.failureReason}>
                  <span style={{ color: "#f50", cursor: "pointer" }}>
                    未过审
                  </span>
                </Tooltip>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="图片">
              <Image width={68} src={editingOrder?.cover} />
            </Descriptions.Item>
            <Descriptions.Item label="名称">
              {editingOrder?.name}
            </Descriptions.Item>
            <Descriptions.Item label="分类">
              {
                orderCategoryOptions.find(
                  (item) => item.id === editingOrder?.categoryId
                )?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="价格">
              {`¥${editingOrder?.price}`}
            </Descriptions.Item>
            <Descriptions.Item label="库存">
              {editingOrder?.stock}
            </Descriptions.Item>
            <Descriptions.Item label="销售佣金比例">
              {`${editingOrder?.salesCommissionRate}%`}
            </Descriptions.Item>
            <Descriptions.Item label="推广佣金比例">
              {`${editingOrder?.promotionCommissionRate}%`}
            </Descriptions.Item>
            <Descriptions.Item label="销量">
              {editingOrder?.salesVolume}
            </Descriptions.Item>
            <Descriptions.Item label=""> </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {dayjs(editingOrder?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingOrder?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">店铺信息</Divider>
          <Descriptions size={"small"} column={2}>
            <Descriptions.Item label="ID">
              {editingOrder?.shopInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="店铺头像">
              <Avatar
                src={editingOrder?.shopInfo?.avatar}
                icon={<UserOutlined />}
                size="small"
              />
            </Descriptions.Item>
            <Descriptions.Item label="店铺名称">
              {editingOrder?.shopInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="店铺分类">
              {
                shopCategoryOptions.find(
                  (item) => item.id === editingOrder?.shopInfo?.categoryId
                )?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {dayjs(editingOrder?.shopInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingOrder?.shopInfo?.updatedAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">商家信息</Divider>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            size={"small"}
            column={2}
          >
            <Descriptions.Item label="ID">
              {editingOrder?.merchantInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="商家类型">
              {editingOrder?.merchantInfo?.type === 1 ? "个人" : "企业"}
            </Descriptions.Item>
            <Descriptions.Item label="联系人姓名">
              {editingOrder?.merchantInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="手机号">
              {editingOrder?.merchantInfo?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="入驻时间">
              {dayjs(editingOrder?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingOrder?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions> */}
        </>
      )}
    </Drawer>
  );
};
