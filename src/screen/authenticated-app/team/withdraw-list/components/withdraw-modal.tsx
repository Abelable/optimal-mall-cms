import { Divider, Drawer } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import { useWithdrawModal } from "../util";

import type { Option } from "types/common";

export const WithdrawModal = ({
  statusOptions,
}: {
  statusOptions: Option[];
}) => {
  const { close, withdrawModalOpen, withdrawInfo, error, isLoading } =
    useWithdrawModal();

  return (
    <Drawer
      forceRender={true}
      title="订单详情"
      width={"120rem"}
      onClose={close}
      open={withdrawModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Divider orientation="left">提现申请{withdrawInfo?.id}</Divider>
        </>
      )}
    </Drawer>
  );
};
