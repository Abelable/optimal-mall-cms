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
      title="团长信息详情"
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
            </Descriptions>
          </>
        </>
      )}
    </Drawer>
  );
};
