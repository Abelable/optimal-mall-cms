import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import {
  useAddGoodsCategory,
  useEditGoodsCategory,
} from "service/goodsCategory";
import { useGoodsCategoryModal, useGoodsCategoriesQueryKey } from "../util";
import { useEffect } from "react";

export const GoodsCategoryModal = () => {
  const [form] = useForm();
  const {
    goodsCategoryModalOpen,
    editingGoodsCategory,
    editingGoodsCategoryId,
    isLoading,
    close,
  } = useGoodsCategoryModal();

  const useMutateRole = editingGoodsCategoryId
    ? useEditGoodsCategory
    : useAddGoodsCategory;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useGoodsCategoriesQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingGoodsCategory);
  }, [editingGoodsCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingGoodsCategory, ...form.getFieldsValue() });
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
      title={editingGoodsCategoryId ? "编辑商品分类" : "新增商品分类"}
      open={goodsCategoryModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            label={"商品分类名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入商品分类名称" }]}
          >
            <Input placeholder={"请输入商品分类名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};