import { useState, useRef, useEffect } from "react";
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
  Card,
  InputRef,
  message,
  Popover,
  Table,
  Tag,
} from "antd";
import { PlusOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { OssUpload } from "components/oss-upload";
import { ErrorBox, ModalLoading } from "components/lib";

import type { CategoryOption } from "types/category";
import type { OperatorOption } from "types/common";

interface ISpecTagValue {
  label: string;
  tags: string[];
}
interface SkuData {
  [x: string]: string | number;
  piece: number;
  stock: number;
  sku: string;
}

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

  const [submitList, setSubmitList] = useState<SkuData[]>([]); // 提交数据
  const [specContent, setSpecContent] = useState<ISpecTagValue[]>([]); //规格内容
  const [specLabelStr, setSpecLabelStr] = useState<string>(""); // 规格名称输入值
  const [visible, setVisible] = useState<boolean>(false); // 点击添加规格按钮控制获取input 元素,控制输入默认选择focus
  const inputRef = useRef<InputRef>(null); // 规格输入框
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputTagValue, setInputTagValue] = useState<string>("");
  const [tagIndex, setTagIndex] = useState<number | null>(null);
  const tagInputRef = useRef(null);

  const columns: any[] = [
    ...specContent.map((t) => {
      return {
        title: t.label,
        render: (item: any) => {
          return item[t.label];
        },
      };
    }),
    {
      title: "价格",
      render: (item: SkuData, _: SkuData, index: number) => {
        return (
          <InputNumber
            min={0}
            defaultValue={submitList[index].piece}
            onChange={(e) => {
              submitList[index].piece = e || 0;
              setSubmitList(submitList);
            }}
          />
        );
      },
    },
    {
      title: "库存",
      render: (item: SkuData, _: SkuData, index: number) => {
        return (
          <InputNumber
            min={0}
            defaultValue={submitList[index].stock}
            onChange={(e) => {
              submitList[index].stock = e || 0;
              setSubmitList(submitList);
            }}
          />
        );
      },
    },
  ];
  const ElInputContent = () => (
    <Input
      ref={inputRef}
      value={specLabelStr}
      style={{ width: 350 }}
      placeholder="请输入规格名称 按下Enter键确认"
      onPressEnter={onAddSpecLabel}
      onChange={(value) => setSpecLabelStr(value.target.value)}
      addonAfter={
        <span style={{ cursor: "pointer" }} onClick={onAddSpecLabel}>
          确认添加
        </span>
      }
    />
  );

  // 添加规格名称
  const onAddSpecLabel = () => {
    if (specLabelStr) {
      setSpecContent(specContent.concat({ label: specLabelStr, tags: [] }));
      setSpecLabelStr("");
      message.success("添加规格明成功");
      tableSku();
    } else {
      message.error("请填写规格名称");
    }
  };

  // 删除规格
  const onDeleteSpec = (index: number) => {
    const specList = [...specContent];
    specList.splice(index, 1);
    setSpecContent(specList);
    message.success("删除规格成功");
    tableSku();
  };

  // 添加规格值
  const onAddSpecTag = (index: number) => {
    if (inputTagValue) {
      const specList = [...specContent];
      specList[index].tags.push(inputTagValue);
      setSpecContent(specList);
      setInputTagValue(""); // 清空输入内容
      tableSku();
      message.success("添加规格值成功");
    }
    setInputVisible(false);
  };

  const onDeleteSpecTag = (labelIndex: number, tagIndex: number) => {
    const specList = [...specContent];
    specList[labelIndex].tags.splice(tagIndex, 1);
    setSpecContent(specList);
    tableSku();
  };
  const tableSku = () => {
    // 绘制商品规格sku
    let temp: any[] = [];
    specContent.forEach((item, index) => {
      if (!temp.length) {
        // specContent当只有一个数据时候只需要
        temp.push(
          ...item.tags.map((str) => {
            const oldItem = submitList.find((t) => t.sku === str);
            if (oldItem) {
              return { ...oldItem };
            } else {
              return {
                [`skuName${index + 1}`]: item.label,
                [`skuValue${index + 1}`]: str,
                [item.label]: str,
                stock: 0,
                piece: 0,
                sku: str,
              };
            }
          })
        );
      } else {
        const array: SkuData[] = [];
        temp.forEach((obj) => {
          if (item.tags.length === 0) array.push(obj);
          array.push(
            ...item.tags.map((t) => {
              obj.sku && (obj.sku = obj.sku + t);
              const oldItem = submitList.find((t) => t.sku === obj.sku);
              if (oldItem) {
                return { ...oldItem };
              } else {
                return {
                  ...obj,
                  [`skuName${index + 1}`]: item.label,
                  [`skuValue${index + 1}`]: t,
                  [item.label]: t,
                  stock: 0,
                  piece: 0,
                };
              }
            })
          );
        });
        temp = array;
      }
    });
    setSubmitList(temp);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [visible]);
  useEffect(() => {
    (tagInputRef.current as any)?.childNodes[1].focus();
    (tagInputRef.current as any)?.childNodes[0].focus();
  }, [inputVisible, tagIndex]);

  useEffect(() => {
    if (editingGoods) {
      const { cover, imageList, detailImageList, defaultSpecImage, ...rest } =
        editingGoods;
      form.setFieldsValue({
        cover: [{ url: cover }],
        imageList: imageList?.length
          ? imageList?.map((item) => ({ url: item }))
          : imageList,
        detailImageList: detailImageList?.length
          ? detailImageList?.map((item) => ({ url: item }))
          : detailImageList,
        defaultSpecImage: [{ url: defaultSpecImage }],

        ...rest,
      });
    }
  }, [editingGoods, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { cover, imageList, detailImageList, defaultSpecImage, ...rest } =
        form.getFieldsValue();
      await mutateAsync({
        ...editingGoods,
        ...rest,
        cover: cover[0].url,
        imageList: imageList.map((item: { url: string }) => item.url),
        detailImageList: detailImageList.map(
          (item: { url: string }) => item.url
        ),
        defaultSpecImage: defaultSpecImage[0].url,
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="leaderCommissionRate"
                label="团长佣金比例"
                rules={[{ required: true, message: "请填写团长佣金比例" }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  style={{ width: "100%" }}
                  placeholder="请填写团长佣金比例"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="shareCommissionRate"
                label="分享佣金比例"
                rules={[{ required: true, message: "请填写分享佣金比例" }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  style={{ width: "100%" }}
                  placeholder="请填写分享佣金比例"
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
          <Card
            title={
              <Popover
                placement="bottomLeft"
                trigger="click"
                content={ElInputContent}
              >
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => setVisible(!visible)}
                >
                  添加规格
                </Button>
              </Popover>
            }
            extra={<h3>商品规格</h3>}
          >
            <div>
              {specContent.map((item, index) => {
                return (
                  <div key={index}>
                    <h3>
                      <span style={{ marginRight: 12 }}>{item.label}</span>
                      <DeleteOutlined
                        onClick={() => onDeleteSpec(index)}
                        style={{ color: "red" }}
                      />
                    </h3>
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      ref={tagInputRef}
                    >
                      <div>
                        {" "}
                        {item.tags.map((str, strKey) => (
                          <Tag
                            style={{ fontSize: 16 }}
                            color="processing"
                            key={strKey}
                          >
                            <span>{str}</span>
                            <CloseOutlined
                              onClick={() => onDeleteSpecTag(index, strKey)}
                            />
                          </Tag>
                        ))}
                      </div>
                      {inputVisible && index === tagIndex ? (
                        <Input
                          placeholder="请输入规格值"
                          value={inputTagValue}
                          size="small"
                          style={{ width: 120 }}
                          onChange={(e) => setInputTagValue(e.target.value)}
                          onBlur={() => onAddSpecTag(index)}
                          onPressEnter={() => onAddSpecTag(index)}
                        />
                      ) : (
                        <Tag
                          icon={<PlusOutlined />}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setTagIndex(index);
                            setInputVisible(!inputVisible);
                          }}
                        >
                          添加规格值
                        </Tag>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <Table
              rowKey={"sku"}
              dataSource={submitList}
              columns={columns}
              pagination={false}
            />
          </Card>
        </Form>
      )}
    </Drawer>
  );
};
