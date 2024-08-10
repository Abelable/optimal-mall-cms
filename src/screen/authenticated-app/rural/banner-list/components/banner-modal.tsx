import { Button, Col, Drawer, Form, Input, Row, Space, Select } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { useAddBanner, useEditBanner } from "service/ruralBanner";
import { useBannerModal, useBannerListQueryKey } from "../util";

import type { Option } from "types/common";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const BannerModal = ({ sceneOptions }: { sceneOptions: Option[] }) => {
  const [form] = useForm();
  const { bannerModalOpen, editingBannerId, editingBanner, isLoading, close } =
    useBannerModal();

  const useMutateBanner = editingBannerId ? useEditBanner : useAddBanner;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateBanner(useBannerListQueryKey());

  useEffect(() => {
    if (editingBanner) {
      const { cover, ...rest } = editingBanner;
      form.setFieldsValue({ cover: cover ? [{ url: cover }] : [], ...rest });
    }
  }, [editingBanner, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { cover, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingBanner,
        ...rest,
        cover: cover && cover.length ? cover[0].url : "",
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
      title={editingBannerId ? "编辑banner" : "新增banner"}
      size={"large"}
      onClose={closeModal}
      open={bannerModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
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
                name="cover"
                label="活动封面"
                tooltip="图片大小不能超过10MB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传活动封面" }]}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="scene"
                label="活动跳转场景"
                rules={[{ required: true, message: "请选择活动跳转场景" }]}
              >
                <Select placeholder="请选择活动跳转场景">
                  {sceneOptions.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="param"
                label="活动链接/id"
                rules={[{ required: true, message: "请输入活动链接/id" }]}
              >
                <Input placeholder="请输入活动链接/id" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="desc" label="活动描述">
                <Input placeholder="请输入活动描述" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
