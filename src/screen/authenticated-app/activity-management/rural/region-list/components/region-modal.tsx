import { Form, Input, Modal } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";

import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { useAddRuralRegion, useEditRuralRegion } from "service/ruralRegion";
import { useRuralRegionModal, useRuralRegionListQueryKey } from "../util";

export const RuralRegionModal = () => {
  const [form] = useForm();
  const {
    ruralRegionModalOpen,
    editingRuralRegionId,
    editingRuralRegion,
    isLoading,
    close,
  } = useRuralRegionModal();

  const useMutateRuralRegion = editingRuralRegionId
    ? useEditRuralRegion
    : useAddRuralRegion;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRuralRegion(useRuralRegionListQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingRuralRegion);
  }, [editingRuralRegion, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingRuralRegion, ...form.getFieldsValue() });
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
      title={editingRuralRegionId ? "编辑地区" : "新增地区"}
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
