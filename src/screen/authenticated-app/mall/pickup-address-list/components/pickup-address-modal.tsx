import { Col, Form, Input, Modal, Row, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAddPickupAddress, useEditPickupAddress } from "service/merchant";
import { usePickupAddressModal, usePickupAddressListQueryKey } from "../util";
import { useEffect } from "react";
import { Map } from "components/map";

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

  const setLng = (longitude: number | undefined) =>
    form.setFieldsValue({
      longitude,
    });
  const setLat = (latitude: number | undefined) =>
    form.setFieldsValue({
      latitude,
    });

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
            label="提货点名称"
            name="name"
            rules={[{ required: true, message: "请输入提货点名称" }]}
          >
            <Input placeholder={"请输入提货点名称"} />
          </Form.Item>
          <Form.Item
            label="提货点地址详情"
            name="name"
            rules={[{ required: true, message: "请输入提货点地址详情" }]}
          >
            <Input placeholder={"请输入提货点地址详情"} />
          </Form.Item>
          <Form.Item label="提货点经纬度" required>
            <Space.Compact>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name="longitude"
                    rules={[{ required: true, message: "请输入经度" }]}
                  >
                    <Input placeholder="请输入经度" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name="latitude"
                    rules={[{ required: true, message: "请输入纬度" }]}
                  >
                    <Input placeholder="请输入纬度" />
                  </Form.Item>
                </Col>
              </Row>
            </Space.Compact>
          </Form.Item>
          <Map setLng={setLng} setLat={setLat} />
        </Form>
      )}
    </Modal>
  );
};
