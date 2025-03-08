import { useState, useEffect } from "react";
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
  Modal,
} from "antd";
import { OssUpload } from "components/oss-upload";
import { ErrorBox, ModalLoading } from "components/lib";
import { SpecEditor } from "./spec-editor";

import type { CategoryOption } from "types/category";
import type { OperatorOption } from "types/common";
import type { Sku, Spec } from "types/goods";
import type { PickupAddress, RefundAddress } from "types/merchant";

interface TableSku extends Sku {
  [x: string]: string | number | object;
}

const refundStatusOptions = [
  { text: "不支持", value: 0 },
  { text: "支持", value: 1 },
];
const deliveryMethodOptions = [
  { text: "快递", value: 1 },
  { text: "自提", value: 2 },
  { text: "快递/自提", value: 3 },
];

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const GoodsModal = ({
  categoryOptions,
  freightTemplateOptions,
  merchantOptions,
  setMerchantId,
  refundAddressOptions,
  pickupAddressOptions,
}: {
  categoryOptions: CategoryOption[];
  freightTemplateOptions: OperatorOption[];
  merchantOptions: OperatorOption[];
  setMerchantId: (id: number) => void;
  refundAddressOptions: Partial<RefundAddress>[];
  pickupAddressOptions: Partial<PickupAddress>[];
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

  const [tableSkuList, setTableSkuList] = useState<TableSku[]>([]);
  const [specContentList, setSpecContentList] = useState<Spec[]>([]);

  useEffect(() => {
    if (editingGoods) {
      const {
        video,
        cover,
        activityCover,
        imageList,
        detailImageList,
        realImageList,
        defaultSpecImage,
        specList = [],
        skuList = [],
        ...rest
      } = editingGoods;

      setTableSkuList(
        skuList.map(
          ({
            name,
            image = "",
            price = 0,
            originalPrice = 0,
            commissionRate = 0,
            stock = 0,
            limit = 0,
          }) => {
            const restData = Object.fromEntries(
              name
                .split(",")
                .map((value, index) => [`${specList[index]?.name}`, value])
            );
            return {
              name,
              image,
              price,
              originalPrice,
              commissionRate,
              stock,
              limit,
              ...restData,
            };
          }
        )
      );
      setSpecContentList(specList || []);

      form.setFieldsValue({
        video: video
          ? [
              {
                url: video,
                thumbUrl: `${video}?x-oss-process=video/snapshot,t_0`,
              },
            ]
          : [],
        cover: [{ url: cover }],
        activityCover: activityCover ? [{ url: activityCover }] : [],
        imageList: imageList?.length
          ? imageList?.map((item) => ({ url: item }))
          : imageList,
        detailImageList: detailImageList?.length
          ? detailImageList?.map((item) => ({ url: item }))
          : detailImageList,
        realImageList: realImageList?.length
          ? realImageList?.map((item) => ({ url: item }))
          : realImageList,
        defaultSpecImage: [{ url: defaultSpecImage }],
        ...rest,
      });
    }
  }, [editingGoods, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const {
        video,
        cover,
        activityCover,
        imageList,
        detailImageList,
        realImageList,
        defaultSpecImage,
        stock,
        ...rest
      } = form.getFieldsValue();

      if (
        specContentList.length &&
        specContentList.findIndex(
          (item) => !item.name || !item.options.length
        ) !== -1
      ) {
        Modal.error({
          title: "请完善商品规格信息",
        });
        return;
      }
      if (tableSkuList.length) {
        if (tableSkuList.findIndex((item) => !item.price) !== -1) {
          Modal.error({
            title: "部分商品规格未填写价格",
          });
          return;
        }
        if (
          stock <
          tableSkuList.reduce(
            (stock, sku) => Number(stock) + Number(sku.stock),
            0
          )
        ) {
          Modal.error({
            title: "请核对库存设置",
            content: "商品总库存，小于商品各规格库存总和",
          });
          return;
        }
      }

      await mutateAsync({
        ...editingGoods,
        ...rest,
        video: video && video.length ? video[0].url : "",
        cover: cover[0].url,
        activityCover:
          activityCover && activityCover.length ? activityCover[0].url : "",
        imageList: imageList.map((item: { url: string }) => item.url),
        detailImageList: detailImageList.map(
          (item: { url: string }) => item.url
        ),
        realImageList:
          realImageList && realImageList.length
            ? realImageList.map((item: { url: string }) => item.url)
            : [],
        defaultSpecImage: defaultSpecImage[0].url,
        stock,
        specList: specContentList,
        skuList: tableSkuList.map(
          ({
            name,
            image,
            price,
            originalPrice,
            commissionRate,
            stock,
            limit,
          }) => ({
            name,
            image,
            price,
            originalPrice,
            commissionRate,
            stock,
            limit,
          })
        ),
      });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    setTableSkuList([]);
    setSpecContentList([]);
    close();
  };

  return (
    <Drawer
      title={editingGoodsId ? "编辑商品" : "新增商品"}
      width={"100rem"}
      forceRender={true}
      onClose={closeModal}
      open={goodsModalOpen}
      styles={{ body: { paddingBottom: 80 } }}
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
            <Col span={8}>
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
            <Col span={8}>
              <Form.Item
                name="activityCover"
                label="活动封面"
                tooltip="图片尺寸：355 * 194"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="video"
                label="商品视频"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <OssUpload accept=".mp4" maxCount={1} />
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
                <OssUpload maxCount={10} multiple />
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
                <OssUpload multiple />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="realImageList"
                label="实拍图片"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <OssUpload multiple />
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
              <Form.Item name="introduction" label="商品介绍">
                <Input placeholder="请输入商品介绍" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categoryIds"
                label="商品分类"
                rules={[{ required: true, message: "请选择商品分类" }]}
              >
                <Select mode="multiple" placeholder="请选择商品分类">
                  {categoryOptions.map(({ id, name }) => (
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
                label="起始价格"
                rules={[{ required: true, message: "请填写起始价格" }]}
              >
                <InputNumber
                  prefix="￥"
                  style={{ width: "100%" }}
                  placeholder="请填写起始价格"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="marketPrice" label="市场原价">
                <InputNumber
                  prefix="￥"
                  style={{ width: "100%" }}
                  placeholder="请填写市场原价"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="commissionRate" label="佣金比例">
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  style={{ width: "100%" }}
                  placeholder="请填写佣金比例"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="numberLimit" label="限购数量">
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="请填写限购数量"
                />
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
                <Select
                  placeholder="请选择商家"
                  showSearch
                  filterOption={(input, option) =>
                    (option!.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  onChange={(val) => setMerchantId(val)}
                >
                  {merchantOptions.map(({ id, name }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.merchantId !== currentValues.merchantId
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("merchantId") && (
                <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="deliveryMethod"
                        label="配送方式"
                        rules={[{ required: true, message: "请选择配送方式" }]}
                      >
                        <Select placeholder="请选择配送方式">
                          {deliveryMethodOptions.map((item) => (
                            <Select.Option key={item.value} value={item.value}>
                              {item.text}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.deliveryMethod !==
                        currentValues.deliveryMethod
                      }
                    >
                      {({ getFieldValue }) =>
                        [2, 3].includes(getFieldValue("deliveryMethod")) && (
                          <Col span={12}>
                            <Form.Item
                              name="pickupAddressIds"
                              label="提货地址"
                              rules={[
                                { required: true, message: "请选择提货地址" },
                              ]}
                            >
                              <Select
                                mode="multiple"
                                placeholder="请选择提货地址"
                              >
                                {pickupAddressOptions.map((item) => (
                                  <Select.Option key={item.id} value={item.id}>
                                    {item.addressDetail}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        )
                      }
                    </Form.Item>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="refundStatus"
                        label="7天无理由退换货"
                        rules={[
                          {
                            required: true,
                            message: "请选择是否支持7天无理由",
                          },
                        ]}
                      >
                        <Select placeholder="请选择是否支持7天无理由">
                          {refundStatusOptions.map((item) => (
                            <Select.Option key={item.value} value={item.value}>
                              {item.text}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.refundStatus !== currentValues.refundStatus
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("refundStatus") === 1 && (
                          <Col span={12}>
                            <Form.Item
                              name="refundAddressIds"
                              label="退货地址"
                              rules={[
                                { required: true, message: "请选择退货地址" },
                              ]}
                            >
                              <Select
                                mode="multiple"
                                placeholder="请选择退货地址"
                              >
                                {refundAddressOptions.map((item) => (
                                  <Select.Option key={item.id} value={item.id}>
                                    {item.addressDetail}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        )
                      }
                    </Form.Item>
                  </Row>
                </>
              )
            }
          </Form.Item>

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

          <SpecEditor
            tableSkuList={tableSkuList}
            setTableSkuList={setTableSkuList}
            specContentList={specContentList}
            setSpecContentList={setSpecContentList}
          />
        </Form>
      )}
    </Drawer>
  );
};
