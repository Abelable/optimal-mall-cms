import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
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

  const submit = () => {
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
    <Drawer
      forceRender={true}
      title={editingMerchantId ? "编辑商家" : "新增商家"}
      size={"large"}
      onClose={closeModal}
      open={merchantModalOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={mutateLoading} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={"品牌名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入品牌名称" }]}
              >
                <Input placeholder={"请输入品牌名称"} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"企业名称"} name={"companyName"}>
                <Input placeholder={"请输入企业名称"} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={"企业负责人"} name={"consigneeName"}>
                <Input placeholder={"请输入负责人姓名"} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"负责人手机号"} name={"mobile"}>
                <Input placeholder={"请输入负责人手机号"} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label={"企业地址"} name={"addressDetail"}>
                <Input placeholder={"请输入企业地址"} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {" "}
              <Form.Item
                name="license"
                label="经营资质"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <OssUpload multiple />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label={"补充说明"} name={"supplement"}>
                <Input placeholder={"选填，例：只收顺丰快递"} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
