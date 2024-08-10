import { Form, Modal, Select } from "antd";
import { ErrorBox } from "components/lib";

import { useForm } from "antd/lib/form/Form";
import { useAddRuralGoods } from "service/ruralGoods";
import { useRuralGoodsModal, useRuralGoodsListQueryKey } from "../util";

import type { RuralRegionOption } from "types/ruralRegion";
import type { GoodsOption } from "types/goods";

export const RuralGoodsModal = ({
  regionOptions,
  goodsOptions,
}: {
  regionOptions: RuralRegionOption[];
  goodsOptions: GoodsOption[];
}) => {
  const [form] = useForm();
  const { ruralGoodsModalOpen, close } = useRuralGoodsModal();

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
      <ErrorBox error={error} />
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
    </Modal>
  );
};
