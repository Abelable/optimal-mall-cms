import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAddPickupAddress, useEditPickupAddress } from "service/merchant";
import { usePickupAddressModal, usePickupAddressListQueryKey } from "../util";
import { useEffect } from "react";

export const PickupAddressModal = ({ merchantId }: { merchantId: number }) => {
  const [form] = useForm();
  const {
    pickupAddressModalOpen,
    editingPickupAddress,
    editingPickupAddressId,
    isLoading,
    close,
  } = usePickupAddressModal();

  const useMutateRole = editingPickupAddressId
    ? useEditPickupAddress
    : useAddPickupAddress;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(usePickupAddressListQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingPickupAddress);
  }, [editingPickupAddress, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        merchantId,
        ...editingPickupAddress,
        ...form.getFieldsValue(),
      });
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
      title={editingPickupAddressId ? "编辑提货地址" : "新增提货地址"}
      open={pickupAddressModalOpen}
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
            label="提货地址名称"
            name="name"
            rules={[{ required: true, message: "请输入提货地址名称" }]}
          >
            <Input placeholder={"请输入提货地址名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
