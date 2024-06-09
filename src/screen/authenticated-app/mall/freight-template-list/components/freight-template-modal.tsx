import {
  Form,
  Input,
  Drawer,
  Space,
  Button,
  Row,
  Col,
  Select,
  InputNumber,
  TreeSelect,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

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

  const submit = () => {
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
    <Drawer
      title={editingFreightTemplateId ? "编辑运费模板" : "新增运费模板"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      open={freightTemplateModalOpen}
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
                name="name"
                label="模板名称"
                rules={[{ required: true, message: "请输入模板名称" }]}
              >
                <Input placeholder="请输入模板名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="title"
                label="运费标题"
                tooltip="可显示在商品详情页"
                rules={[{ required: true, message: "请输入运费标题" }]}
              >
                <Input placeholder="请输入运费标题" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="computeMode"
                label="计算方式"
                rules={[{ required: true, message: "请选择计算方式" }]}
              >
                <Select placeholder="请选择计算方式">
                  {[
                    { text: "不计重量和件数", value: 1 },
                    { text: "按商品件数", value: 2 },
                  ].map(({ text, value }) => (
                    <Select.Option key={value} value={value}>
                      {text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="freeQuota" label="免费额度">
                <InputNumber
                  prefix="￥"
                  style={{ width: "100%" }}
                  placeholder="请填写免费额度"
                />
              </Form.Item>
            </Col>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="配送地区">
                  <Form.List name="areaList">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex" }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "closeTime"]}
                              rules={[
                                { required: true, message: "请选择地区" },
                              ]}
                            >
                              <TreeSelect
                                treeData={[
                                  {
                                    title: "Node1",
                                    value: "0-0",
                                    key: "0-0",
                                    children: [
                                      {
                                        title: "Child Node1",
                                        value: "0-0-0",
                                        key: "0-0-0",
                                      },
                                    ],
                                  },
                                  {
                                    title: "Node2",
                                    value: "0-1",
                                    key: "0-1",
                                    children: [
                                      {
                                        title: "Child Node3",
                                        value: "0-1-0",
                                        key: "0-1-0",
                                      },
                                      {
                                        title: "Child Node4",
                                        value: "0-1-1",
                                        key: "0-1-1",
                                      },
                                      {
                                        title: "Child Node5",
                                        value: "0-1-2",
                                        key: "0-1-2",
                                      },
                                    ],
                                  },
                                ]}
                                treeCheckable
                                placeholder="请选择地区"
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "fee"]}
                              rules={[
                                { required: true, message: "请填写运费" },
                              ]}
                            >
                              <InputNumber
                                prefix="￥"
                                placeholder="请填写运费"
                              />
                            </Form.Item>
                            <MinusCircleOutlined
                              style={{ color: "#ff4d4f" }}
                              onClick={() => remove(name)}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          添加配送地区
                        </Button>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              </Col>
            </Row>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
