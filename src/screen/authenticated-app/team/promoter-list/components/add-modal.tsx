import { Form, Modal, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useForm } from "antd/lib/form/Form";
import { useAddPromoter } from "service/promoter";
import { useAddPromoterModal, usePromoterListQueryKey } from "../util";

import { OptionAvatar } from "components/lib";

export const AddModal = ({
  userOptions,
  levelOptions,
}: {
  userOptions: { id: number; avatar: string; nickname: string }[];
  levelOptions: { text: string; value: number; scene: number }[];
}) => {
  const [form] = useForm();
  const { promoterModalOpen, close } = useAddPromoterModal();

  const { mutateAsync, isLoading: mutateLoading } = useAddPromoter(
    usePromoterListQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      const { level, ...rest } = form.getFieldsValue();
      const scene = levelOptions.find((item) => item.value === level)?.scene;
      await mutateAsync({
        level,
        scene,
        ...rest,
      });
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
      title="新增推广员"
      open={promoterModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="userId"
          label="用户"
          rules={[{ required: true, message: "请选择用户" }]}
        >
          <Select placeholder="请选择用户">
            {userOptions.map(({ id, avatar, nickname }) => (
              <Select.Option key={id} value={id}>
                <OptionAvatar src={avatar} icon={<UserOutlined />} />
                <span>{nickname}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="level"
          label="推广员身份"
          rules={[{ required: true, message: "请选择推广员身份" }]}
        >
          <Select placeholder="请选择推广员身份">
            {levelOptions.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
