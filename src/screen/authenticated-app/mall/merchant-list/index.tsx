import styled from "@emotion/styled";
import { useMerchantList } from "service/merchant";
import { toNumber } from "utils";
import { List } from "./components/list";
import { MerchantModal } from "./components/merchant-modal";
import { useMerchantListSearchParams } from "./util";
import { SearchPanel } from "./components/search-panel";

export const MerchantList = () => {
  const [params, setParams] = useMerchantListSearchParams();
  const { isLoading, error, data } = useMerchantList(params);

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
      <MerchantModal />
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
