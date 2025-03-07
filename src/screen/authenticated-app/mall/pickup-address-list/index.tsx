import styled from "@emotion/styled";
import { toNumber } from "utils";
import { usePickupAddressListSearchParams } from "./util";
import { useMerchantOptions, usePickupAddressList } from "service/merchant";

import { List } from "./components/list";
import { PickupAddressModal } from "./components/pickup-address-modal";

export const PickupAddressList = () => {
  const { data: merchantOptions, error: merchantOptionsError } =
    useMerchantOptions();
  const [params, setParams] = usePickupAddressListSearchParams();
  const { data, isLoading, error } = usePickupAddressList(params);

  return (
    <Container>
      <Main>
        <List
          merchantOptions={merchantOptions || []}
          error={error || merchantOptionsError}
          params={params}
          setParams={setParams}
          dataSource={data?.list}
          loading={isLoading}
          pagination={{
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <PickupAddressModal />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;
