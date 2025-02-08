import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import styled from "@emotion/styled";
import _ from "lodash";
import { useDeliveryOrder } from "service/order";
import { useDeliveryModal, useOrderListQueryKey } from "../util";

import type { ExpressOption } from "types/express";
import type { Goods } from "types/order";

interface FormItem {
  id: number;
  goodsId: number | undefined;
  goodsNumber: number | undefined;
  goodsMaxNumber: number | undefined;
}

export const DeliveryModal = ({
  expressOptions,
}: {
  expressOptions: ExpressOption[];
}) => {
  const [form] = useForm();
  const { deliveryModalOpen, deliveryOrderId, orderInfo, close } =
    useDeliveryModal();

  const { mutateAsync, isLoading: mutateLoading } = useDeliveryOrder(
    useOrderListQueryKey()
  );

  const [formList, setFormList] = useState<FormItem[]>([]);
  const [optionsGoodsList, setOptionsGoodsList] = useState<Goods[]>([]);

  useEffect(() => {
    if (orderInfo) {
      const { goodsList = [], packageGoodsList = [] } = orderInfo;
      const list = goodsList?.map((item) => {
        const number =
          packageGoodsList
            ?.filter((packageGoods) => packageGoods.goodsId === item.id)
            .reduce((a, b) => a + b.goodsNumber, 0) || 0;
        return { ...item, number: item.number - number };
      });
      setOptionsGoodsList(list || []);
    }
  }, [orderInfo]);

  const addItem = () => {
    const defaultFormItem: Omit<FormItem, "id"> = {
      goodsId: undefined,
      goodsNumber: undefined,
      goodsMaxNumber: undefined,
    };
    const list = [...formList];
    const id = list.length
      ? list.sort((a, b) => a.id - b.id)[formList.length - 1].id + 1
      : 1;
    setFormList([...formList, { id, ...defaultFormItem }]);
  };

  const selectGoods = (id: number) => (goodsId: number) => {
    const { number } =
      (orderInfo?.goodsList || []).find((goods) => goods.id === goodsId) || {};
    const list = formList.map((item: any) =>
      item.id === id ? { ...item, goodsId, goodsMaxNumber: number } : item
    );
    setFormList([...list]);
  };
  const setGoodsNumber = (id: number) =>
    _.debounce((e: any) => {
      const list = formList.map((item: any) =>
        item.id === id ? { ...item, goodsNumber: e } : item
      );
      setFormList([...list]);
    }, 1000);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { shipCode, ...rest } = form.getFieldsValue();
      const shipChannel = expressOptions.find(
        (item) => item.code === shipCode
      )?.name;
      await mutateAsync({
        id: +deliveryOrderId,
        shipChannel,
        shipCode,
        ...rest,
      });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    setFormList([]);
    close();
  };

  return (
    <Modal
      forceRender={true}
      title="订单发货"
      open={deliveryModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="shipCode"
          label="物流公司"
          rules={[{ required: true, message: "请选择物流公司" }]}
        >
          <Select placeholder="请选择物流公司">
            {expressOptions.map((item) => (
              <Select.Option key={item.code} value={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={"快递单号"}
          name={"shipSn"}
          rules={[{ required: true, message: "请输入快递单号" }]}
        >
          <Input placeholder={"请输入快递单号"} />
        </Form.Item>
        <Form.Item
          name="isAllDelivered"
          label="发货状态"
          rules={[{ required: true, message: "请选择发货状态" }]}
        >
          <Select placeholder="请选择发货状态">
            {[
              { name: "部分发货", value: 0 },
              { name: "全部发货", value: 1 },
            ].map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Divider orientation="left" style={{ fontSize: "14px" }}>
        包裹商品
      </Divider>
      <>
        <Table
          style={{ width: "100%" }}
          rowKey="id"
          columns={[
            {
              title: "商品",
              dataIndex: "goodsId",
              render: (value, item) => (
                <Select
                  style={{ width: "240px" }}
                  onChange={selectGoods(item.id)}
                  placeholder="请选择商品"
                >
                  {optionsGoodsList.map(({ id, cover, name }) => (
                    <Select.Option key={id} value={id}>
                      <GoodsCover src={cover} />
                      <span>{name}</span>
                    </Select.Option>
                  ))}
                </Select>
              ),
              width: "240px",
            },
            {
              title: "商品数量",
              dataIndex: "goodsNumber",
              render: (value, item) =>
                item.goodsMaxNumber ? (
                  <InputNumber
                    style={{ width: "120px" }}
                    defaultValue={item.goodsMaxNumber}
                    max={item.goodsMaxNumber}
                    min={1}
                    onChange={setGoodsNumber(item.id)}
                    placeholder="请输入数量"
                  />
                ) : (
                  <></>
                ),
            },
            {
              render: (value, item) => (
                <Delete
                  onClick={() =>
                    setFormList([
                      ...formList.filter(
                        (_item: FormItem) => _item.id !== item.id
                      ),
                    ])
                  }
                />
              ),
            },
          ]}
          pagination={false}
          dataSource={formList}
          bordered
        />
        <Button
          style={{ marginTop: "2rem", width: "100%" }}
          icon={<PlusOutlined />}
          onClick={addItem}
        >
          添加商品选项
        </Button>
      </>
    </Modal>
  );
};

const Delete = styled(DeleteOutlined)`
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: red;
  }
`;

const GoodsCover = styled.img`
  margin-right: 6px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
`;
