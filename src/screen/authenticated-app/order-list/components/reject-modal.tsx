import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRejectOrder } from "service/order";
import { useRejectModal, useOrderListQueryKey } from "../util";

export const RejectModal = () => {
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
      title={"商品驳回重审"}
      open={rejectModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={"驳回原因"}
          name={"failureReason"}
          rules={[{ required: true, message: "请输入驳回原因" }]}
        >
          <Input placeholder={"请输入驳回原因"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
