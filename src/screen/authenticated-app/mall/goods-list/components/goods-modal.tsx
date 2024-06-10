import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { useAddGoods, useEditGoods } from "service/goods";
import { useGoodsModal, useGoodsListQueryKey } from "../util";

import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  InputNumber,
  Divider,
} from "antd";
import { OssUpload } from "components/oss-upload";
import { ErrorBox, ModalLoading } from "components/lib";

import type { CategoryOption } from "types/category";
import type { OperatorOption } from "types/common";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const GoodsModal = ({
  categoryOptions,
  freightTemplateOptions,
  merchantOptions,
}: {
  categoryOptions: CategoryOption[];
  freightTemplateOptions: OperatorOption[];
  merchantOptions: OperatorOption[];
}) => {
  const [form] = useForm();

  const { goodsModalOpen, editingGoodsId, editingGoods, isLoading, close } =
    useGoodsModal();

  const useMutationGoods = editingGoodsId ? useEditGoods : useAddGoods;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationGoods(useGoodsListQueryKey());

  useEffect(() => {
    if (editingGoods) {
      const { imageList, ...rest } = editingGoods;
      form.setFieldsValue({
        imageList: imageList?.length
          ? imageList?.map((item) => ({ url: item }))
          : imageList,
        ...rest,
      });
    }
  }, [editingGoods, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { video, imageList, projectList, openTimeList, ...rest } =
        form.getFieldsValue();
      await mutateAsync({
        ...editingGoods,
        ...rest,
        video: video && video.length ? video[0].url : "",
        imageList: imageList.map((item: { url: string }) => item.url),
        projectList: projectList.length
          ? projectList.map(
              (item: { image: { url: string }[]; name: string }) => ({
                ...item,
                image: item.image[0].url,
              })
            )
          : projectList,
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
      title={editingGoodsId ? "编辑商品" : "新增商品"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      open={goodsModalOpen}
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
          <Divider orientation="left" plain>
            基本信息
          </Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="cover"
                label="商品封面"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传商品封面" }]}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="imageList"
                label="主图图片"
                tooltip="最多不超过10张"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传主图图片" }]}
              >
                <OssUpload maxCount={10} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="detailImageList"
                label="详情图片"
                tooltip="注意图片顺序"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传详情图片" }]}
              >
                <OssUpload />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="商品名称"
                rules={[{ required: true, message: "请输入商品名称" }]}
              >
                <Input placeholder="请输入商品名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categoryId"
                label="商品分类"
                rules={[{ required: true, message: "请选择商品分类" }]}
              >
                <Select placeholder="请选择商品分类">
                  {categoryOptions.map(({ id, name }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="merchantId"
                label="商家"
                rules={[{ required: true, message: "请选择商家" }]}
              >
                <Select placeholder="请选择商家">
                  {merchantOptions.map(({ id, name }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="freightTemplateId"
                label="运费模板"
                rules={[{ required: true, message: "请选择运费模板" }]}
              >
                <Select placeholder="请选择运费模板">
                  {freightTemplateOptions.map(({ id, name }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="店铺价格"
                rules={[{ required: true, message: "请填写店铺价格" }]}
              >
                <InputNumber
                  prefix="￥"
                  style={{ width: "100%" }}
                  placeholder="请填写店铺价格"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="marketPrice" label="市场价格">
                <InputNumber
                  prefix="￥"
                  style={{ width: "100%" }}
                  placeholder="请填写市场价格"
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left" plain>
            商品规格
          </Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="defaultSpecImage"
                label="默认规格图片"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传默认规格图片" }]}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="stock"
                label="总库存"
                rules={[{ required: true, message: "请填写总库存" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="请填写总库存"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
