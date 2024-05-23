import { Descriptions, Divider, Drawer, Image, Tooltip } from "antd";

import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useGoodsModal } from "../util";

import type { CategoryOption } from "types/category";

export const GoodsModal = ({
  goodsCategoryOptions,
}: {
  goodsCategoryOptions: CategoryOption[];
}) => {
  const { close, goodsModalOpen, editingGoods, error, isLoading } =
    useGoodsModal();

  return (
    <Drawer
      forceRender={true}
      title="商品详情"
      size={"large"}
      onClose={close}
      open={goodsModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Divider orientation="left">商品信息</Divider>
          <Descriptions size={"small"} column={2}>
            <Descriptions.Item label="ID">{editingGoods?.id}</Descriptions.Item>
            <Descriptions.Item label="状态">
              {editingGoods?.status === 0 ? (
                <span style={{ color: "#87d068" }}>待审核</span>
              ) : editingGoods?.status === 1 ? (
                <span style={{ color: "#296BEF", cursor: "pointer" }}>
                  售卖中
                </span>
              ) : (
                <Tooltip title={editingGoods?.failureReason}>
                  <span style={{ color: "#f50", cursor: "pointer" }}>
                    未过审
                  </span>
                </Tooltip>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="图片">
              <Image width={68} src={editingGoods?.cover} />
            </Descriptions.Item>
            <Descriptions.Item label="名称">
              {editingGoods?.name}
            </Descriptions.Item>
            <Descriptions.Item label="分类">
              {
                goodsCategoryOptions.find(
                  (item) => item.id === editingGoods?.categoryId
                )?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="价格">
              {`¥${editingGoods?.price}`}
            </Descriptions.Item>
            <Descriptions.Item label="库存">
              {editingGoods?.stock}
            </Descriptions.Item>
            <Descriptions.Item label="销售佣金比例">
              {`${editingGoods?.leaderCommissionRate}%`}
            </Descriptions.Item>
            <Descriptions.Item label="推广佣金比例">
              {`${editingGoods?.shareCommissionRate}%`}
            </Descriptions.Item>
            <Descriptions.Item label="销量">
              {editingGoods?.salesVolume}
            </Descriptions.Item>
            <Descriptions.Item label=""> </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {dayjs(editingGoods?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingGoods?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
