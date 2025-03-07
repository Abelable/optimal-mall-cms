import styled from "@emotion/styled";
import { toNumber } from "utils";
import { useRefundAddressListSearchParams } from "./util";
import { useMerchantOptions, useRefundAddressList } from "service/merchant";

import { List } from "./components/list";
import { RefundAddressModal } from "./components/refund-address-modal";

export const RefundAddressList = () => {
  const { data: merchantOptions, error: merchantOptionsError } =
    useMerchantOptions();
  const [params, setParams] = useRefundAddressListSearchParams();
  const { data, isLoading, error } = useRefundAddressList(params);

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
      <RefundAddressModal merchantId={params.merchantId} />
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
