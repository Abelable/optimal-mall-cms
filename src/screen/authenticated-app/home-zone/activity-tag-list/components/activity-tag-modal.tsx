import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAddActivityTag, useEditActivityTag } from "service/activityTag";
import { useActivityTagModal, useActivityTagListQueryKey } from "../util";
import { useEffect } from "react";

export const ActivityTagModal = () => {
  const [form] = useForm();
  const {
    activityTagModalOpen,
    editingActivityTag,
    editingActivityTagId,
    isLoading,
    close,
  } = useActivityTagModal();

  const useMutateRole = editingActivityTagId
    ? useEditActivityTag
    : useAddActivityTag;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useActivityTagListQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingActivityTag);
  }, [editingActivityTag, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingActivityTag, ...form.getFieldsValue() });
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
      title={editingActivityTagId ? "编辑活动标签" : "新增活动标签"}
      open={activityTagModalOpen}
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
            label="活动标签名称"
            name="name"
            rules={[{ required: true, message: "请输入活动标签名称" }]}
          >
            <Input placeholder={"请输入活动标签名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
