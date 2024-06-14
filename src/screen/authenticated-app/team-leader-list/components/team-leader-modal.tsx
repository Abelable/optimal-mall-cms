import { Descriptions, Drawer, Image } from "antd";
import { ErrorBox, ModalLoading, Row } from "components/lib";
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
                <Image width={100} src={editingTeamLeader?.idCardFrontPhoto} />
              </Descriptions.Item>
              <Descriptions.Item label="身份证反面照片">
                <Image width={100} src={editingTeamLeader?.idCardFrontPhoto} />
              </Descriptions.Item>
              <Descriptions.Item label="手持身份证照片">
                <Image width={100} src={editingTeamLeader?.holdIdCardPhoto} />
              </Descriptions.Item>
              <Descriptions.Item label="团长资质照片">
                <Row gap>
                  {editingTeamLeader?.qualificationPhoto.map((item, index) => (
                    <Image key={index} width={100} src={item} />
                  ))}
                </Row>
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
