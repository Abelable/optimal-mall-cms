import { Form, Modal, Select } from "antd";
import { ErrorBox, GoodsCover } from "components/lib";

import { useForm } from "antd/lib/form/Form";
import { useGoodsOptions } from "service/goods";
import { useAddGoods } from "service/villageGrainGoods";
import { useGoodsModal, useGoodsListQueryKey } from "../util";

export const GoodsModal = () => {
  const [form] = useForm();
  const { grainGoodsModalOpen, close } = useGoodsModal();

  const { data: goodsOptions = [], error: goodsOptionsError } =
    useGoodsOptions();

  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useAddGoods(useGoodsListQueryKey());

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
      open={grainGoodsModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error || goodsOptionsError} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="goodsIds"
          label="商品"
          rules={[{ required: true, message: "请选择商品" }]}
        >
          <Select
            mode="multiple"
            showSearch
            filterOption={(input, option) =>
              (option!.children as any)[1].props.children
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            placeholder="请选择商品"
          >
            {goodsOptions.map(({ id, cover, name }) => (
              <Select.Option key={id} value={id}>
                <GoodsCover src={cover} />
                <span>{name}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
