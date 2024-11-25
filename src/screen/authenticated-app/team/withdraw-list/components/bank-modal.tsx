import { Descriptions, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useBankCardModal } from "../util";
import { ErrorBox, ModalLoading } from "components/lib";

export const BankModal = () => {
  const [form] = useForm();
  const {
    bankCardModalOpen,
    bankCardOwnerId,
    bankCardInfo,
    error,
    isLoading,
    close,
  } = useBankCardModal();

  const confirm = async () => {
    // await mutateAsync({ id: +rejectWithdrawId, ...form.getFieldsValue() });
    closeModal();
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      forceRender={true}
      title="收款银行信息"
      open={bankCardModalOpen}
      onCancel={close}
      footer={null}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Descriptions size={"small"} layout="vertical" bordered>
            <Descriptions.Item label="卡号">
              {bankCardInfo?.code}
            </Descriptions.Item>
            <Descriptions.Item label="姓名">
              {bankCardInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="开户行">
              {bankCardInfo?.bankName}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  );
};
