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

import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import styled from "@emotion/styled";
import _ from "lodash";
import { useDeliveryOrder } from "service/order";
import { useDeliveryModal, useOrderListQueryKey } from "../util";

import type { ExpressOption } from "types/express";
import { GoodsCover } from "components/lib";

interface FormItem {
  id: number;
  goodsId: number | undefined;
  required: boolean;
  name: string;
  options: string[] | undefined;
}

const typeOptions = [
  { id: 1, name: "单行文本框" },
  { id: 2, name: "多行文本框" },
  { id: 3, name: "数字输入框" },
  { id: 4, name: "单选按钮框" },
  { id: 5, name: "多选按钮框" },
  { id: 6, name: "图片上传框" },
];

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

  const addItem = () => {
    const defaultFormItem: Omit<FormItem, "id"> = {
      goodsId: undefined,
      required: false,
      name: "",
      options: undefined,
    };
    const list = [...formList];
    const id = list.length
      ? list.sort((a, b) => a.id - b.id)[formList.length - 1].id + 1
      : 1;
    setFormList([...formList, { id, ...defaultFormItem }]);
  };

  const selectGoods = (id: number) => (goodsId: number) => {
    const list = formList.map((item: any) =>
      item.id === id ? { ...item, goodsId } : item
    );
    setFormList([...list]);
  };
  const setName = (id: number) =>
    _.debounce((e: any) => {
      const list = formList.map((item: any) =>
        item.id === id ? { ...item, name: e.target.value } : item
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
                  defaultValue={value}
                  onChange={selectGoods(item.id)}
                  placeholder="请选择商品"
                >
                  {(orderInfo?.goodsList || []).map(({ id, cover, name }) => (
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
              dataIndex: "name",
              render: (value, item) => (
                <InputNumber
                  style={{ width: "120px" }}
                  defaultValue={value}
                  onChange={setName(item.id)}
                  placeholder="请输入数量"
                />
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
