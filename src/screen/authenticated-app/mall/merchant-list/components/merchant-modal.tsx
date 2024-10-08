import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { useAddMerchant, useEditMerchant } from "service/merchant";
import { useMerchantModal, useMerchantListQueryKey } from "../util";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const MerchantModal = () => {
  const [form] = useForm();
  const {
    merchantModalOpen,
    editingMerchantId,
    editingMerchant,
    isLoading,
    close,
  } = useMerchantModal();

  const useMutateMerchant = editingMerchantId
    ? useEditMerchant
    : useAddMerchant;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateMerchant(useMerchantListQueryKey());

  useEffect(() => {
    if (editingMerchant) {
      const { license, ...rest } = editingMerchant;
      form.setFieldsValue({
        license: license ? license?.map((item) => ({ url: item })) : [],
        ...rest,
      });
    }
  }, [editingMerchant, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { license, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingMerchant,
        ...rest,
        license: license
          ? license.map((item: { url: string }) => item.url)
          : [],
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
      title={editingMerchantId ? "编辑商家" : "新增商家"}
      open={merchantModalOpen}
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
            label={"商家名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入商家名称" }]}
          >
            <Input placeholder={"请输入商家名称"} />
          </Form.Item>
          <Form.Item
            label={"收件人姓名"}
            name={"consigneeName"}
            rules={[{ required: true, message: "请输入收件人姓名" }]}
          >
            <Input placeholder={"请输入收件人姓名"} />
          </Form.Item>
          <Form.Item
            label={"收件人手机号"}
            name={"mobile"}
            rules={[{ required: true, message: "请输入收件人手机号" }]}
          >
            <Input placeholder={"请输入收件人手机号"} />
          </Form.Item>
          <Form.Item
            label={"收件地址"}
            name={"addressDetail"}
            rules={[{ required: true, message: "请输入收件地址" }]}
          >
            <Input placeholder={"请输入收件地址"} />
          </Form.Item>
          <Form.Item
            name="license"
            label="经营资质"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <OssUpload multiple />
          </Form.Item>

          <Form.Item label={"补充说明"} name={"supplement"}>
            <Input placeholder={"选填，例：只收顺丰快递"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
