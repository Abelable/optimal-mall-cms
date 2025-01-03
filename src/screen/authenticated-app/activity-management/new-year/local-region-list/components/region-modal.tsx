import { Form, Input, Modal } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";

import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { useAddRegion, useEditRegion } from "service/newYearLocalRegion";
import { useRegionModal, useRegionListQueryKey } from "../util";

export const RegionModal = () => {
  const [form] = useForm();
  const {
    ruralRegionModalOpen,
    editingRegionId,
    editingRegion,
    isLoading,
    close,
  } = useRegionModal();

  const useMutateRegion = editingRegionId ? useEditRegion : useAddRegion;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRegion(useRegionListQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingRegion);
  }, [editingRegion, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingRegion, ...form.getFieldsValue() });
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
      title={editingRegionId ? "编辑地区" : "新增地区"}
      open={ruralRegionModalOpen}
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
            label={"地区名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入地区名称" }]}
          >
            <Input placeholder={"请输入地区名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
