import { Form, Modal, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useForm } from "antd/lib/form/Form";
import { useBindUser } from "service/user";
import { useBindModal, useUsersQueryKey } from "../util";

import type { PromoterOption } from "types/promoter";
import { OptionAvatar } from "components/lib";

export const BindModal = ({
  superiorOptions,
}: {
  superiorOptions: PromoterOption[];
}) => {
  const [form] = useForm();
  const { bindModalOpen, bindUserId, close } = useBindModal();

  const { mutateAsync, isLoading: mutateLoading } = useBindUser(
    useUsersQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        userId: +bindUserId,
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
    <Modal
      forceRender={true}
      title="绑定上级"
      open={bindModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="superiorId"
          label="上级"
          rules={[{ required: true, message: "请选择上级" }]}
        >
          <Select placeholder="请选择上级">
            {superiorOptions.map(({ id, avatar, nickname }) => (
              <Select.Option key={id} value={id}>
                <OptionAvatar src={avatar} icon={<UserOutlined />} />
                <span>{nickname}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
