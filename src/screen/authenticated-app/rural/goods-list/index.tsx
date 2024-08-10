import { RuralGoodsModal } from "./components/goods-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { useRuralGoodsList } from "service/ruralGoods";
import { toNumber } from "utils";
import { useRuralGoodsListSearchParams } from "./util";
import { useRuralRegionOptions } from "service/ruralRegion";

export const RuralGoodsList = () => {
  const [params, setParams] = useRuralGoodsListSearchParams();
  const { isLoading, error, data } = useRuralGoodsList(params);
  const { data: regionOptions = [], error: regionOptionsError } =
    useRuralRegionOptions();

  return (
    <Container>
      <Main>
        <SearchPanel
          regionOptions={regionOptions}
          params={params}
          setParams={setParams}
        />
        <List
          regionOptions={regionOptions}
          params={params}
          setParams={setParams}
          error={error || regionOptionsError}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
          bordered
        />
      </Main>
      <RuralGoodsModal regionOptions={regionOptions} />
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
