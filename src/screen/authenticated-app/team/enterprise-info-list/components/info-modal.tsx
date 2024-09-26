import { Descriptions, Drawer, Image } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import { useEnterpriseInfoModal } from "../util";

export const EnterpriseInfoModal = () => {
  const { close, merchantModalOpen, editingEnterpriseInfo, error, isLoading } =
    useEnterpriseInfoModal();

  return (
    <Drawer
      forceRender={true}
      title="企业认证信息"
      size={"large"}
      onClose={close}
      open={merchantModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="基础信息"
            size={"small"}
            column={1}
            bordered
          >
            <Descriptions.Item label="ID">
              {editingEnterpriseInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="姓名">
              {editingEnterpriseInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="银行名称">
              {editingEnterpriseInfo?.bankName}
            </Descriptions.Item>
            <Descriptions.Item label="银行卡号">
              {editingEnterpriseInfo?.bankCardCode}
            </Descriptions.Item>
            <Descriptions.Item label="银行地址">
              {editingEnterpriseInfo?.bankAddress}
            </Descriptions.Item>
            <Descriptions.Item label="营业执照照片">
              <Image
                width={132}
                height={84}
                src={editingEnterpriseInfo?.businessLicensePhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="身份证正面照片">
              <Image
                width={132}
                height={84}
                src={editingEnterpriseInfo?.idCardFrontPhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="身份证反面照片">
              <Image
                width={132}
                height={84}
                src={editingEnterpriseInfo?.idCardFrontPhoto}
              />
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
