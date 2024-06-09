import { Form, Input, InputNumber, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import {
  useAddFreightTemplate,
  useEditFreightTemplate,
} from "service/freigthTemplate";
import {
  useFreightTemplateModal,
  useFreightTemplateListQueryKey,
} from "../util";
import { useEffect } from "react";

export const FreightTemplateModal = () => {
  const [form] = useForm();
  const {
    freightTemplateModalOpen,
    editingFreightTemplate,
    editingFreightTemplateId,
    isLoading,
    close,
  } = useFreightTemplateModal();

  const useMutateRole = editingFreightTemplateId
    ? useEditFreightTemplate
    : useAddFreightTemplate;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useFreightTemplateListQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingFreightTemplate);
  }, [editingFreightTemplate, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        ...editingFreightTemplate,
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
      title={editingFreightTemplateId ? "编辑商品分类" : "新增商品分类"}
      open={freightTemplateModalOpen}
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
            label="商品分类名称"
            name="name"
            rules={[{ required: true, message: "请输入商品分类名称" }]}
          >
            <Input placeholder={"请输入商品分类名称"} />
          </Form.Item>
          <Form.Item label="团队长佣金比例范围%" required>
            <Input.Group compact>
              <Form.Item
                style={{ marginBottom: 0, width: "46%" }}
                name="minLeaderCommissionRate"
                rules={[
                  { required: true, message: "请输入团队长佣金最小比例" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="请输入团队长佣金最小比例"
                />
              </Form.Item>
              <Input
                style={{
                  width: "8%",
                  borderRight: 0,
                  pointerEvents: "none",
                  textAlign: "center",
                  backgroundColor: "#fff",
                }}
                placeholder="~"
                disabled
              />
              <Form.Item
                style={{ marginBottom: 0, width: "46%" }}
                name="maxLeaderCommissionRate"
                rules={[
                  { required: true, message: "请输入团队长佣金最大比例" },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  placeholder="请输入团队长佣金最大比例"
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item label="分享佣金比例范围%" required>
            <Input.Group compact>
              <Form.Item
                style={{ marginBottom: 0, width: "46%" }}
                name="minShareCommissionRate"
                rules={[{ required: true, message: "请输入最小分享佣金比例" }]}
              >
                <InputNumber
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="请输入最小分享佣金比例"
                />
              </Form.Item>
              <Input
                style={{
                  width: "8%",
                  borderRight: 0,
                  pointerEvents: "none",
                  textAlign: "center",
                  backgroundColor: "#fff",
                }}
                placeholder="~"
                disabled
              />
              <Form.Item
                style={{ marginBottom: 0, width: "46%" }}
                name="maxShareCommissionRate"
                rules={[{ required: true, message: "请输入最大分享佣金比例" }]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  placeholder="请输入最大分享佣金比例"
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
