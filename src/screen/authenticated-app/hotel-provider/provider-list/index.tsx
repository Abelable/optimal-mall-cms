import styled from "@emotion/styled";
import { useProviders } from "service/hotelProvider";
import { toNumber } from "utils";
import { useProvidersSearchParams } from "./util";

import { ProviderModal } from "./components/provider-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

export const HotelProviderList = () => {
  const [params, setParams] = useProvidersSearchParams();
  const { isLoading, error, data } = useProviders(params);

  return (
    <Container>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
        <List
          params={params}
          setParams={setParams}
          error={error}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <ProviderModal />
      <RejectModal />
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
