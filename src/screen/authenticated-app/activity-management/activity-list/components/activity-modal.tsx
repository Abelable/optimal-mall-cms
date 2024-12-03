import { DatePicker, Form, Input, Modal, Select } from "antd";
import { ErrorBox, GoodsCover, ModalLoading } from "components/lib";

import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { useGoodsOptions } from "service/goods";
import { useAddActivity, useEditActivity } from "service/activity";
import { useActivityModal, useActivityListQueryKey } from "../util";

import { useEffect } from "react";

const statusOptions = [
  { text: "预告", value: 0 },
  { text: "进行中", value: 1 },
];

export const ActivityModal = () => {
  const [form] = useForm();
  const { data: goodsOptions = [], error: goodsOptionsError } =
    useGoodsOptions();

  const {
    activityModalOpen,
    editingActivityId,
    editingActivity,
    isLoading,
    close,
  } = useActivityModal();
  const useMutationActivity = editingActivityId
    ? useEditActivity
    : useAddActivity;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutationActivity(useActivityListQueryKey());

  useEffect(() => {
    if (editingActivity) {
      const { startTime, endTime, ...rest } = editingActivity;
      form.setFieldsValue({
        startTime: startTime ? moment(startTime) : startTime,
        endTime: endTime ? moment(endTime) : endTime,
        ...rest,
      });
    }
  }, [editingActivity, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingActivity, ...form.getFieldsValue() });
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
      title={editingActivityId ? "编辑活动" : "新增活动"}
      open={activityModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error || goodsOptionsError} />
      {isLoading ? (
        <ModalLoading />
      ) : (
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
            label="活动状态"
            rules={[{ required: true, message: "请选择活动状态" }]}
          >
            <Select placeholder="请选择活动状态">
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
            {}
            {({ getFieldValue }) => {
              // 监听formItem值变化
              if (getFieldValue("status") === 0) {
                return (
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
                );
              }
            }}
          </Form.Item>
          <Form.Item name="endTime" label="活动结束时间">
            <DatePicker
              style={{ width: "100%" }}
              showTime
              placeholder="请选择活动结束时间"
            />
          </Form.Item>
          {editingActivityId ? (
            <></>
          ) : (
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
          )}
        </Form>
      )}
    </Modal>
  );
};
