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
  Modal,
} from "antd";
import { PlusOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { OssUpload } from "components/oss-upload";
import { ErrorBox, ModalLoading } from "components/lib";

import type { CategoryOption } from "types/category";
import type { OperatorOption } from "types/common";
import type { Sku, Spec } from "types/goods";

interface TableSku extends Sku {
  [x: string]: string | number | object;
}

const refundStatusOptions = [
  { text: "不支持", value: 0 },
  { text: "支持", value: 1 },
];

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

  const [tableSkuList, setTableSkuList] = useState<TableSku[]>([]);
  const [specContentList, setSpecContentList] = useState<Spec[]>([]);
  const [specLabelStr, setSpecLabelStr] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [tagInputVisible, setTagInputVisible] = useState<boolean>(false);
  const [inputTagValue, setInputTagValue] = useState<string>("");
  const [tagIndex, setTagIndex] = useState<number | null>(null);
  const [specIndex, setSpecIndex] = useState<number | null>(null);
  const tagInputRef = useRef(null);

  const setSpecContent = (name: string, index: number) => {
    const newList = specContentList.map((spec, _index) => {
      if (_index === index) {
        return {
          ...spec,
          name,
        };
      } else {
        return spec;
      }
    });
    setSpecContentList([...newList]);
  };

  const columns: any[] = [
    {
      title: "图片",
      render: (item: TableSku, _: TableSku, index: number) => {
        return (
          <OssUpload
            defaultFileList={
              tableSkuList[index].image
                ? [
                    {
                      uid: `${index}`,
                      name: "",
                      url: tableSkuList[index].image,
                    },
                  ]
                : []
            }
            onChange={(e) => {
              tableSkuList[index].image = e.fileList[0]?.url || "";
              setTableSkuList(tableSkuList);
            }}
            maxCount={1}
            zoom={0.5}
          />
        );
      },
    },
    ...specContentList.map((t) => {
      return {
        title: t.name,
        width: "18rem",
        render: (item: any) => {
          return item[t.name];
        },
      };
    }),
    {
      title: "价格",
      render: (item: TableSku, _: TableSku, index: number) => {
        return (
          <InputNumber
            min={0}
            defaultValue={tableSkuList[index].price}
            style={{ width: "100%" }}
            onChange={(e) => {
              tableSkuList[index].price = e || 0;
              setTableSkuList(tableSkuList);
            }}
          />
        );
      },
    },
    {
      title: "原价",
      render: (item: TableSku, _: TableSku, index: number) => {
        return (
          <InputNumber
            min={0}
            defaultValue={tableSkuList[index].originalPrice}
            style={{ width: "100%" }}
            onChange={(e) => {
              tableSkuList[index].originalPrice = e || 0;
              setTableSkuList(tableSkuList);
            }}
          />
        );
      },
    },
    {
      title: "佣金比例",
      render: (item: TableSku, _: TableSku, index: number) => {
        return (
          <InputNumber
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            style={{ width: "100%" }}
            defaultValue={tableSkuList[index].commissionRate}
            onChange={(e) => {
              tableSkuList[index].commissionRate = e || 0;
              setTableSkuList(tableSkuList);
            }}
          />
        );
      },
    },
    {
      title: "库存",
      render: (item: TableSku, _: TableSku, index: number) => {
        return (
          <InputNumber
            min={0}
            defaultValue={tableSkuList[index].stock}
            style={{ width: "100%" }}
            onChange={(e) => {
              tableSkuList[index].stock = e || 0;
              setTableSkuList(tableSkuList);
            }}
          />
        );
      },
    },
  ];

  // 添加规格名称
  const onAddSpecLabel = () => {
    if (specLabelStr) {
      setSpecContentList(
        specContentList.concat({ name: specLabelStr, options: [] })
      );
      setSpecLabelStr("");
      message.success("添加规格明成功");
      tableSku();
    } else {
      message.error("请填写规格名称");
    }
  };

  // 删除规格
  const onDeleteSpec = (index: number) => {
    const specList = [...specContentList];
    specList.splice(index, 1);
    setSpecContentList(specList);
    message.success("删除规格成功");
    tableSku();
  };

  // 添加规格值
  const onAddSpecTag = (index: number) => {
    if (inputTagValue) {
      const specList = [...specContentList];
      specList[index].options.push(inputTagValue);
      setSpecContentList(specList);
      setInputTagValue(""); // 清空输入内容
      setTagIndex(null);
      setSpecIndex(null);
      tableSku();
      message.success("添加规格值成功");
    }
    setInputVisible(false);
  };
  const onEditSpecTag = (labelIndex: number, tagIndex: number) => {
    if (inputTagValue) {
      const specList = specContentList.map((_item, _index) => {
        if (_index === labelIndex) {
          const options = _item.options.map((__item, __index) =>
            __index === tagIndex ? inputTagValue : __item
          );
          return {
            ..._item,
            options,
          };
        } else {
          return _item;
        }
      });
      setSpecContentList([...specList]);
      setInputTagValue(""); // 清空输入内容
      setTagIndex(null);
      setSpecIndex(null);
      tableSku();
      message.success("规格值修改成功");
    }
    setTagInputVisible(false);
  };
  const onDeleteSpecTag = (labelIndex: number, tagIndex: number) => {
    const specList = [...specContentList];
    specList[labelIndex].options.splice(tagIndex, 1);
    setSpecContentList(specList);
    tableSku();
    setInputTagValue("");
    setTagIndex(null);
    setSpecIndex(null);
  };

  const tableSku = () => {
    // 绘制商品规格sku
    let temp: any[] = [];
    specContentList.forEach((item, index) => {
      if (!temp.length) {
        // specContentList当只有一个数据时候只需要
        temp.push(
          ...item.options.map((str) => {
            const oldItem = tableSkuList.find((t) => t.name === str);
            if (oldItem) {
              return { ...oldItem };
            } else {
              return {
                [item.name]: str,
                price: 0,
                originalPrice: 0,
                commissionRate: 0,
                stock: 0,
                name: str,
              };
            }
          })
        );
      } else {
        const array: TableSku[] = [];
        temp.forEach((obj) => {
          if (item.options.length === 0) array.push(obj);
          array.push(
            ...item.options.map((t) => {
              if (obj.name) {
                const nameList = obj.name.split(",");
                if (index > nameList.length - 1) {
                  obj.name = [...nameList, t].join();
                } else {
                  nameList[index] = t;
                  obj.name = nameList.join();
                }
              }
              const oldItem = tableSkuList.find((_t) => _t.name === obj.name);
              if (oldItem) {
                return { ...oldItem };
              } else {
                return {
                  ...obj,
                  [item.name]: t,
                  price: 0,
                  originalPrice: 0,
                  commissionRate: 0,
                  stock: 0,
                };
              }
            })
          );
        });
        temp = array;
      }
    });
    setTableSkuList(temp);
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
      const {
        video,
        cover,
        activityCover,
        imageList,
        detailImageList,
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
          }) => {
            const restData = Object.fromEntries(
              name
                .split(",")
                .map((value, index) => [`${specList[index].name}`, value])
            );
            return {
              name,
              image,
              price,
              originalPrice,
              commissionRate,
              stock,
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
        defaultSpecImage: defaultSpecImage[0].url,
        stock,
        specList: specContentList,
        skuList: tableSkuList.map(
          ({ name, image, price, originalPrice, commissionRate, stock }) => ({
            name,
            image,
            price,
            originalPrice,
            commissionRate,
            stock,
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
            <Col span={12}>
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
            <Col span={12}>
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
          </Row>
          <Row gutter={16}>
            <Col span={24}>
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
          </Row>
          <Row gutter={16}>
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
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="marketPrice" label="市场原价">
                <InputNumber
                  prefix="￥"
                  style={{ width: "100%" }}
                  placeholder="请填写市场原价"
                />
              </Form.Item>
            </Col>
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
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="refundStatus"
                label="7天无理由退换货"
                rules={[{ required: true, message: "请选择是否支持7天无理由" }]}
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

          <Popover
            placement="topLeft"
            trigger="click"
            content={
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
            }
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setVisible(!visible)}
            >
              添加规格属性
            </Button>
          </Popover>
          <>
            {specContentList.map((item, index) => (
              <Card
                key={index}
                style={{ marginTop: "2.4rem" }}
                title={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Row>
                      <div>规格属性：</div>
                      <Input
                        placeholder="请输入规格属性"
                        value={item.name}
                        size="small"
                        style={{ marginRight: "8px", width: "fit-content" }}
                        onChange={(e) => setSpecContent(e.target.value, index)}
                      />
                    </Row>
                    <Button
                      type="link"
                      danger
                      onClick={() => onDeleteSpec(index)}
                    >
                      删除
                    </Button>
                  </div>
                }
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    {item.options.map((str, strKey) => (
                      <Input
                        placeholder="请输入规格值"
                        value={str}
                        size="small"
                        style={{ width: 120 }}
                        onChange={(e) => setInputTagValue(e.target.value)}
                      />
                    ))}
                  </div>
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
                </div>
              </Card>
            ))}
          </>

          <Table
            style={{ marginTop: "2.4rem" }}
            bordered
            rowKey={"name"}
            dataSource={tableSkuList}
            columns={columns}
            pagination={false}
          />

          <Card
            style={{ marginTop: "15px" }}
            title={
              <Popover
                placement="bottomLeft"
                trigger="click"
                content={
                  <Input
                    ref={inputRef}
                    value={specLabelStr}
                    style={{ width: 350 }}
                    placeholder="请输入规格名称 按下Enter键确认"
                    onPressEnter={onAddSpecLabel}
                    onChange={(value) => setSpecLabelStr(value.target.value)}
                    addonAfter={
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={onAddSpecLabel}
                      >
                        确认添加
                      </span>
                    }
                  />
                }
              >
                <Button
                  type="dashed"
                  size="middle"
                  icon={<PlusOutlined />}
                  onClick={() => setVisible(!visible)}
                >
                  添加规格
                </Button>
              </Popover>
            }
          >
            <div>
              {specContentList.map((item, index) => {
                return (
                  <div key={index} style={{ marginBottom: "18px" }}>
                    <h3>
                      <Input
                        placeholder="请输入规格"
                        value={item.name}
                        size="small"
                        style={{ marginRight: "8px", width: "fit-content" }}
                        onChange={(e) => setSpecContent(e.target.value, index)}
                      />
                      <DeleteOutlined
                        onClick={() => onDeleteSpec(index)}
                        style={{ color: "red", fontSize: "14px" }}
                      />
                    </h3>
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      ref={tagInputRef}
                    >
                      <div>
                        {" "}
                        {item.options.map((str, strKey) =>
                          tagInputVisible &&
                          index === tagIndex &&
                          strKey === specIndex ? (
                            <Input
                              placeholder="请输入规格值"
                              value={inputTagValue}
                              size="small"
                              style={{ width: 120 }}
                              onChange={(e) => setInputTagValue(e.target.value)}
                              onBlur={() => onEditSpecTag(index, strKey)}
                              onPressEnter={() => onEditSpecTag(index, strKey)}
                            />
                          ) : (
                            <Tag
                              color="processing"
                              key={strKey}
                              onClick={() => {
                                setInputTagValue(str);
                                setTagIndex(index);
                                setSpecIndex(strKey);
                                setTagInputVisible(!tagInputVisible);
                              }}
                            >
                              <span>{str}</span>
                              <CloseOutlined
                                onClick={() => onDeleteSpecTag(index, strKey)}
                              />
                            </Tag>
                          )
                        )}
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
              bordered
              rowKey={"name"}
              dataSource={tableSkuList}
              columns={columns}
              pagination={false}
            />
          </Card>
        </Form>
      )}
    </Drawer>
  );
};
