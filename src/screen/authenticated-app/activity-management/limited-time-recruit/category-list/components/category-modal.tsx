import { Form, Input, Modal } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";

import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import {
  useAddCategory,
  useEditCategory,
} from "service/limitedTimeRecruitCategory";
import { useCategoryModal, useCategoryListQueryKey } from "../util";

export const CategoryModal = () => {
  const [form] = useForm();
  const {
    categoryModalOpen,
    editingCategoryId,
    editingCategory,
    isLoading,
    close,
  } = useCategoryModal();

  const useMutateCategory = editingCategoryId
    ? useEditCategory
    : useAddCategory;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateCategory(useCategoryListQueryKey());

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
      title={editingCategoryId ? "编辑分类" : "新增分类"}
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
            label={"分类名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入分类名称" }]}
          >
            <Input placeholder={"请输入分类名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
