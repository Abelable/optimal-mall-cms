import { AdvanceGoodsModal } from "./components/goods-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useAdvanceGoodsList } from "service/advanceGoods";
import { toNumber } from "utils";
import { useAdvanceGoodsListSearchParams } from "./util";

export const AdvanceGoodsList = () => {
  const [params, setParams] = useAdvanceGoodsListSearchParams();
  const { isLoading, error, data } = useAdvanceGoodsList(params);

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
      <AdvanceGoodsModal />
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
