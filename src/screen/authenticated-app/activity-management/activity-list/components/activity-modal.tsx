import { DatePicker, Form, Image, Input, Modal, Select } from "antd";
import { ErrorBox } from "components/lib";

import styled from "@emotion/styled";
import { useForm } from "antd/lib/form/Form";
import { useGoodsOptions } from "service/goods";
import { useAddActivity } from "service/activity";
import { useActivityModal, useActivityListQueryKey } from "../util";

import type { Option } from "types/common";

const statusOptions = [
  { text: "活动预告", value: 0 },
  { text: "今日主推", value: 1 },
];

export const ActivityModal = ({ typeOptions }: { typeOptions: Option[] }) => {
  const [form] = useForm();
  const { activityModalOpen, close } = useActivityModal();

  const { data: goodsOptions = [], error: goodsOptionsError } =
    useGoodsOptions();

  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useAddActivity(useActivityListQueryKey());

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync(form.getFieldsValue());
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
      title="新增活动"
      open={activityModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error || goodsOptionsError} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="活动名称"
          rules={[{ required: true, message: "请输入活动名称" }]}
        >
          <Input placeholder="请输入活动名称" />
        </Form.Item>
        <Form.Item
          name="status"
          label="活动类型"
          rules={[{ required: true, message: "请选择活动类型" }]}
        >
          <Select placeholder="请选择活动类型">
            {statusOptions.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.status !== currentValues.status
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("status") === 0 && (
              <Form.Item
                name="startTime"
                label="活动开始时间"
                rules={[{ required: true, message: "请选择活动开始时间" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  placeholder="请选择活动开始时间"
                />
              </Form.Item>
            )
          }
        </Form.Item>
        <Form.Item name="endTime" label="活动结束时间">
          <DatePicker
            style={{ width: "100%" }}
            showTime
            placeholder="请选择活动结束时间"
          />
        </Form.Item>
        <Form.Item
          name="goodsType"
          label="商品类型"
          rules={[{ required: true, message: "请选择商品类型" }]}
        >
          <Select placeholder="请选择商品类型">
            {typeOptions.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="goodsIds"
          label="商品"
          rules={[{ required: true, message: "请选择商品" }]}
        >
          <Select
            mode="multiple"
            showSearch
            filterOption={(input, option) =>
              (option!.children as any)[1].props.children
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            placeholder="请选择商品"
          >
            {goodsOptions.map(({ id, cover, name }) => (
              <Select.Option key={id} value={id}>
                <GoodsCover src={cover} />
                <span>{name}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const GoodsCover = styled(Image)`
  margin-right: 0.6rem;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 0.4rem;
`;
