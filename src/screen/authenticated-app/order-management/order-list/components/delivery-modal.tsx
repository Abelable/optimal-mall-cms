import { Button, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import styled from "@emotion/styled";
import { useDeliveryOrder } from "service/order";
import { useDeliveryModal, useOrderListQueryKey } from "../util";

import type { ExpressOption } from "types/express";
import type { Goods } from "types/order";

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

        <Form.Item label="包裹列表" required>
          <Form.List
            name="packageList"
            rules={[
              {
                validator: async (_, packageList) => {
                  if (!packageList || packageList.length === 0) {
                    return Promise.reject(new Error("请至少添加一个包裹"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      key={key}
                      style={{
                        marginRight: "8px",
                        padding: "16px",
                        paddingBottom: 0,
                        flex: 1,
                        border: "1px solid #d9d9d9",
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "shipCode"]}
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
                        {...restField}
                        name={[name, "shipSn"]}
                        label="快递单号"
                        rules={[{ required: true, message: "请输入快递单号" }]}
                      >
                        <Input placeholder="请输入快递单号" />
                      </Form.Item>

                      <Form.Item label="商品列表" required>
                        <Form.List
                          name={[name, "goodsList"]}
                          rules={[
                            {
                              validator: async (_, goodsList) => {
                                if (!goodsList || goodsList.length === 0) {
                                  return Promise.reject(
                                    new Error("请至少添加一个商品")
                                  );
                                }
                              },
                            },
                          ]}
                        >
                          {(
                            goodsFields,
                            { add: addGoods, remove: removeGoods }
                          ) => (
                            <>
                              {goodsFields.map(
                                ({
                                  key: goodsKey,
                                  name: goodsName,
                                  ...goodsRestField
                                }) => (
                                  <Space
                                    key={goodsKey}
                                    style={{ display: "flex" }}
                                    align="baseline"
                                  >
                                    <Form.Item
                                      {...goodsRestField}
                                      name={[goodsName, "goodsId"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "请选择商品",
                                        },
                                      ]}
                                    >
                                      <Select
                                        style={{ width: "240px" }}
                                        placeholder="请选择商品"
                                      >
                                        {optionsGoodsList.map(
                                          ({ id, cover, name }) => (
                                            <Select.Option key={id} value={id}>
                                              <GoodsCover src={cover} />
                                              <span>{name}</span>
                                            </Select.Option>
                                          )
                                        )}
                                      </Select>
                                    </Form.Item>

                                    {/* <Form.Item
                                      {...goodsRestField}
                                      name={[goodsName, "number"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "请输入商品数量",
                                        },
                                      ]}
                                    >
                                      <InputNumber
                                        style={{ width: "150px" }}
                                        placeholder="请输入商品数量"
                                        min={1}
                                        max={
                                          optionsGoodsList.find(
                                            (item) =>
                                              item.id ===
                                              form.getFieldValue([
                                                "packageList",
                                                name,
                                                "goodsList",
                                                goodsName,
                                                "goodsId",
                                              ])
                                          )?.number || 1
                                        }
                                      />
                                    </Form.Item> */}

                                    <Form.Item
                                      dependencies={[
                                        ["goodsList", name, "goodsId"],
                                      ]}
                                      style={{ height: "32px" }}
                                    >
                                      {({ getFieldValue }) => {
                                        const goodsId = getFieldValue([
                                          "goodsList",
                                          name,
                                          "goodsId",
                                        ]);
                                        if (goodsId) {
                                          const selectedGoods =
                                            optionsGoodsList.find(
                                              (item) => item.id === goodsId
                                            );
                                          const maxQuantity = selectedGoods
                                            ? selectedGoods.number
                                            : undefined;

                                          return (
                                            <Form.Item
                                              {...restField}
                                              name={[name, "number"]}
                                              rules={[
                                                {
                                                  required: true,
                                                  message: "请输入商品数量",
                                                },
                                              ]}
                                            >
                                              <InputNumber
                                                style={{ width: "150px" }}
                                                placeholder="请输入商品数量"
                                                defaultValue={maxQuantity}
                                                min={1}
                                                max={maxQuantity}
                                              />
                                            </Form.Item>
                                          );
                                        } else {
                                          return <></>;
                                        }
                                      }}
                                    </Form.Item>

                                    <MinusCircleOutlined
                                      style={{ color: "#ff4d4f" }}
                                      onClick={() => removeGoods(goodsName)}
                                    />
                                  </Space>
                                )
                              )}
                              <Button
                                type="dashed"
                                onClick={() => addGoods()}
                                block
                                icon={<PlusOutlined />}
                              >
                                添加商品
                              </Button>
                            </>
                          )}
                        </Form.List>
                      </Form.Item>
                    </div>
                    <MinusCircleOutlined
                      style={{ color: "#ff4d4f" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加包裹
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const GoodsCover = styled.img`
  margin-right: 6px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
`;
