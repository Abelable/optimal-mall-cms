import { LivestockModal } from "./components/livestock-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useGiftGoodsList } from "service/giftGoods";
import { toNumber } from "utils";
import { useLivestockListSearchParams } from "./util";

export const LivestockList = () => {
  const [params, setParams] = useLivestockListSearchParams();
  const { isLoading, error, data } = useGiftGoodsList(params);

  return (
    <Container>
      <Main>
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
            showSizeChanger: true,
          }}
          bordered
        />
      </Main>
      <LivestockModal />
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
