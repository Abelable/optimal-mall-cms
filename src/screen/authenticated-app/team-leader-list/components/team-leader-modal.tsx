import { Descriptions, Drawer, Image } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useTeamLeaderModal } from "../util";

export const TeamLeaderModal = () => {
  const { close, teamLeaderModalOpen, editingTeamLeader, error, isLoading } =
    useTeamLeaderModal();

  return (
    <Drawer
      forceRender={true}
      title="商家详情"
      size={"large"}
      onClose={close}
      open={teamLeaderModalOpen}
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
              {editingTeamLeader?.id}
            </Descriptions.Item>
            <Descriptions.Item label="商家类型">
              {editingTeamLeader?.type === 1 ? "个人" : "企业"}
            </Descriptions.Item>
            <Descriptions.Item label="入驻时间">
              {dayjs(editingTeamLeader?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingTeamLeader?.updatedAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
          </Descriptions>
          {editingTeamLeader?.type === 1 ? (
            <>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="个人信息"
                size={"small"}
                column={1}
                bordered
              >
                <Descriptions.Item label="姓名">
                  {editingTeamLeader?.name}
                </Descriptions.Item>
                <Descriptions.Item label="身份证号">
                  {editingTeamLeader?.idCardNumber}
                </Descriptions.Item>
                <Descriptions.Item label="身份证正面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingTeamLeader?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="身份证反面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingTeamLeader?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="手持身份证照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingTeamLeader?.holdIdCardPhoto}
                  />
                </Descriptions.Item>
              </Descriptions>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="联系方式"
                size={"small"}
                column={1}
                bordered
              >
                <Descriptions.Item label="手机号">
                  {editingTeamLeader?.mobile}
                </Descriptions.Item>
                <Descriptions.Item label="邮箱">
                  {editingTeamLeader?.email}
                </Descriptions.Item>
                <Descriptions.Item label="联系地址">
                  {editingTeamLeader?.regionDesc}
                </Descriptions.Item>
                <Descriptions.Item label="详细地址">
                  {editingTeamLeader?.addressDetail}
                </Descriptions.Item>
              </Descriptions>
            </>
          ) : (
            <>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="企业信息"
                size={"small"}
                column={1}
                bordered
              >
                <Descriptions.Item label="企业名称">
                  {editingTeamLeader?.companyName}
                </Descriptions.Item>
                <Descriptions.Item label="企业经营地址">
                  {editingTeamLeader?.regionDesc}
                </Descriptions.Item>
                <Descriptions.Item label="企业地址详情">
                  {editingTeamLeader?.addressDetail}
                </Descriptions.Item>
                <Descriptions.Item label="营业执照照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingTeamLeader?.businessLicensePhoto}
                  />
                </Descriptions.Item>
              </Descriptions>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="法人信息"
                size={"small"}
                column={2}
              >
                <Descriptions.Item label="姓名">
                  {editingTeamLeader?.name}
                </Descriptions.Item>
                <Descriptions.Item label="手机号">
                  {editingTeamLeader?.mobile}
                </Descriptions.Item>
                <Descriptions.Item label="邮箱">
                  {editingTeamLeader?.email}
                </Descriptions.Item>
                <Descriptions.Item label="身份证号">
                  {editingTeamLeader?.idCardNumber}
                </Descriptions.Item>
                <Descriptions.Item label="身份证正面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingTeamLeader?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="身份证反面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingTeamLeader?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="手持身份证照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingTeamLeader?.holdIdCardPhoto}
                  />
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="银行信息"
            size={"small"}
            column={1}
            bordered
          >
            <Descriptions.Item label="持卡人姓名">
              {editingTeamLeader?.bankCardOwnerName}
            </Descriptions.Item>
            <Descriptions.Item label="银行账号">
              {editingTeamLeader?.bankCardNumber}
            </Descriptions.Item>
            <Descriptions.Item label="开户银行及支行名称">
              {editingTeamLeader?.bankName}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
