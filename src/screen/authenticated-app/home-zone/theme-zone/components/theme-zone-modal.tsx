import { ErrorBox, ModalLoading } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useAddThemeZone, useEditThemeZone } from "service/themeZone";
import { useThemeZoneModal, useThemeZoneListQueryKey } from "../util";
import type { Option } from "types/common";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const ThemeZoneModal = ({
  sceneOptions,
}: {
  sceneOptions: Option[];
}) => {
  const [form] = useForm();
  const {
    themeZoneModalOpen,
    editingThemeZone,
    editingThemeZoneId,
    isLoading,
    close,
  } = useThemeZoneModal();

  const useMutateRole = editingThemeZoneId ? useEditThemeZone : useAddThemeZone;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useThemeZoneListQueryKey());

  useEffect(() => {
    if (editingThemeZone) {
      const { cover, bg, ...rest } = editingThemeZone;
      form.setFieldsValue({
        cover: cover ? [{ url: cover }] : [],
        bg: bg ? [{ url: bg }] : [],
        ...rest,
      });
    }
  }, [editingThemeZone, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { cover, bg, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingThemeZone,
        ...rest,
        cover: cover && cover.length ? cover[0].url : "",
        bg: bg && bg.length ? bg[0].url : "",
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
      title={editingThemeZone ? "编辑主题" : "新增主题"}
      size={"large"}
      onClose={closeModal}
      open={themeZoneModalOpen}
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
                label="名称"
                name="name"
                rules={[{ required: true, message: "请输入名称" }]}
              >
                <Input placeholder={"请输入名称"} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="cover"
                label="封面"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传封面" }]}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="bg"
                label="背景图"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="scene"
                label="跳转场景"
                rules={[{ required: true, message: "请选择跳转场景" }]}
              >
                <Select placeholder="请选择跳转场景">
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
                noStyle
                shouldUpdate={(prevValues, currentValues) => {
                  // 监听formItem值变化
                  return prevValues.scene !== currentValues.scene;
                }}
              >
                {({ getFieldValue }) =>
                  getFieldValue("scene") && getFieldValue("scene") !== 1 ? (
                    <Form.Item name="param" label="页面路径">
                      <Input placeholder="请输入页面路径" />
                    </Form.Item>
                  ) : (
                    <></>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
