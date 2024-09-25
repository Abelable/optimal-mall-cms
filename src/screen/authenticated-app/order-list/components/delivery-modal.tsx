import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRejectOrder } from "service/order";
import { useRejectModal, useOrderListQueryKey } from "../util";

export const DeliveryModal = () => {
  const [form] = useForm();
  const { rejectModalOpen, rejectOrderId, close } = useRejectModal();

  const { mutateAsync, isLoading: mutateLoading } = useRejectOrder(
    useOrderListQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ id: +rejectOrderId, ...form.getFieldsValue() });
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
      title="发货"
      open={rejectModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={"快递单号"}
          name={"shipSn"}
          rules={[{ required: true, message: "请输入快递单号" }]}
        >
          <Input placeholder={"请输入快递单号"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
