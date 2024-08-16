import { Form, Image, Modal, Select } from "antd";
import { ErrorBox } from "components/lib";

import styled from "@emotion/styled";
import { useForm } from "antd/lib/form/Form";
import { useGoodsOptions } from "service/goods";
import { useAddTodayGoods } from "service/todayGoods";
import { useTodayGoodsModal, useTodayGoodsListQueryKey } from "../util";

export const TodayGoodsModal = () => {
  const [form] = useForm();
  const { todayGoodsModalOpen, close } = useTodayGoodsModal();

  const { data: goodsOptions = [], error: goodsOptionsError } =
    useGoodsOptions();

  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useAddTodayGoods(useTodayGoodsListQueryKey());

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
      open={todayGoodsModalOpen}
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

const GoodsCover = styled(Image)`
  margin-right: 0.6rem;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 0.4rem;
`;