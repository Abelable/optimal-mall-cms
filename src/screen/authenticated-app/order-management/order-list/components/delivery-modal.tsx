import { Form, Input, Modal, Select } from "antd";

import { useForm } from "antd/lib/form/Form";
import { useDeliveryOrder } from "service/order";
import { useDeliveryModal, useOrderListQueryKey } from "../util";

import type { ExpressOption } from "types/express";

export const DeliveryModal = ({
  expressOptions,
}: {
  expressOptions: ExpressOption[];
}) => {
  const [form] = useForm();
  const { deliveryModalOpen, deliveryOrderId, close } = useDeliveryModal();

  const { mutateAsync, isLoading: mutateLoading } = useDeliveryOrder(
    useOrderListQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      const { shipCode, ...rest } = form.getFieldsValue();
      const shipChannel = expressOptions.find(
        (item) => item.code === shipCode
      )?.name;
      await mutateAsync({
        id: +deliveryOrderId,
        shipChannel,
        shipCode,
        ...rest,
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
      title="发货"
      open={deliveryModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="shipCode"
          label="物流公司"
          rules={[{ required: true, message: "请选择物流公司" }]}
        >
          <Select placeholder="请选择物流公司">
            {expressOptions.map((item) => (
              <Select.Option key={item.code} value={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
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
