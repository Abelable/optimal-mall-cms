import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAddRefundAddress, useEditRefundAddress } from "service/merchant";
import { useRefundAddressModal, useRefundAddressListQueryKey } from "../util";
import { useEffect } from "react";

export const RefundAddressModal = () => {
  const [form] = useForm();
  const {
    refundAddressModalOpen,
    editingRefundAddress,
    editingRefundAddressId,
    isLoading,
    close,
  } = useRefundAddressModal();

  const useMutateRole = editingRefundAddressId
    ? useEditRefundAddress
    : useAddRefundAddress;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useRefundAddressListQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingRefundAddress);
  }, [editingRefundAddress, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingRefundAddress, ...form.getFieldsValue() });
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
      title={editingRefundAddressId ? "编辑退货地址" : "新增退货地址"}
      open={refundAddressModalOpen}
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
            label="退货地址名称"
            name="name"
            rules={[{ required: true, message: "请输入退货地址名称" }]}
          >
            <Input placeholder={"请输入退货地址名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
