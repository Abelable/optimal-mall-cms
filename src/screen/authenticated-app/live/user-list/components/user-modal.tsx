import { Form, Modal, Select } from "antd";
import { ErrorBox, OptionAvatar } from "components/lib";
import { UserOutlined } from "@ant-design/icons";

import { useForm } from "antd/lib/form/Form";
import { useUserOptions } from "service/user";
import { useAddLiveUser } from "service/liveUser";
import { useLiveUserModal, useLiveUserListQueryKey } from "../util";

export const LiveUserModal = () => {
  const [form] = useForm();
  const { liveUserModalOpen, close } = useLiveUserModal();

  const { data: userOptions = [], error: userOptionsError } = useUserOptions();

  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useAddLiveUser(useLiveUserListQueryKey());

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
      title="新增直播人员"
      open={liveUserModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error || userOptionsError} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="userIds"
          label="用户"
          rules={[{ required: true, message: "请选择用户" }]}
        >
          <Select
            mode="multiple"
            showSearch
            filterOption={(input, option) =>
              (option!.children as any)[1].props.children
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            placeholder="请选择用户"
          >
            {userOptions.map(({ id, avatar, nickname }) => (
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
