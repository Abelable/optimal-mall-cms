import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAddCategory, useEditCategory } from "service/category";
import { useCategoryModal, useCategoriesQueryKey } from "../util";
import { useEffect } from "react";

export const CategoryModal = () => {
  const [form] = useForm();
  const {
    categoryModalOpen,
    editingCategory,
    editingCategoryId,
    isLoading,
    close,
  } = useCategoryModal();

  const useMutateRole = editingCategoryId ? useEditCategory : useAddCategory;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useCategoriesQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingCategory);
  }, [editingCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingCategory, ...form.getFieldsValue() });
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
      title={editingCategoryId ? "编辑商品分类" : "新增商品分类"}
      open={categoryModalOpen}
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
            label="商品分类名称"
            name="name"
            rules={[{ required: true, message: "请输入商品分类名称" }]}
          >
            <Input placeholder={"请输入商品分类名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
