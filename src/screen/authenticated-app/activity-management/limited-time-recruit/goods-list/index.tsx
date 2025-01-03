import { GoodsModal } from "./components/goods-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { useGoodsList } from "service/limitedTimeRecruitGoods";
import { toNumber } from "utils";
import { useGoodsListSearchParams } from "./util";
import { useCategoryOptions } from "service/limitedTimeRecruitCategory";

export const LimitedTimeRecruitGoodsList = () => {
  const [params, setParams] = useGoodsListSearchParams();
  const { isLoading, error, data } = useGoodsList(params);
  const { data: categoryOptions = [], error: categoryOptionsError } =
    useCategoryOptions();

  return (
    <Container>
      <Main>
        <SearchPanel
          categoryOptions={categoryOptions}
          params={params}
          setParams={setParams}
        />
        <List
          categoryOptions={categoryOptions}
          params={params}
          setParams={setParams}
          error={error || categoryOptionsError}
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
      <GoodsModal categoryOptions={categoryOptions} />
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
