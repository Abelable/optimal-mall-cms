import { Form, Modal, Select } from "antd";
import { ErrorBox } from "components/lib";

import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { useGoodsOptions } from "service/goods";
import { useAddRuralGoods } from "service/ruralGoods";
import { useRuralGoodsModal, useRuralGoodsListQueryKey } from "../util";

import type { RuralRegionOption } from "types/ruralRegion";

export const RuralGoodsModal = ({
  regionOptions,
}: {
  regionOptions: RuralRegionOption[];
}) => {
  const [form] = useForm();
  const { ruralGoodsModalOpen, close } = useRuralGoodsModal();

  const [keywords, setKeywords] = useState("");
  const { data: goodsOptions = [], error: goodsOptionsError } = useGoodsOptions(
    { keywords }
  );

  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useAddRuralGoods(useRuralGoodsListQueryKey());

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync(form.getFieldsValue());
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
      title="新增商品"
      open={ruralGoodsModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error || goodsOptionsError} />
      <Form.Item
        name="regionId"
        label="地区"
        rules={[{ required: true, message: "请选择地区" }]}
      >
        <Select placeholder="请选择地区">
          {regionOptions.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="goodsIds"
        label="商品"
        rules={[{ required: true, message: "请选择商品" }]}
      >
        <Select
          onChange={(keywords: string) => setKeywords(keywords)}
          placeholder="请选择商品"
          showSearch
        >
          {goodsOptions.map(({ id, cover, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Modal>
  );
};
