import { TodayGoodsModal } from "./components/goods-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useTodayGoodsList } from "service/todayGoods";
import { toNumber } from "utils";
import { useTodayGoodsListSearchParams } from "./util";

const typeOptions = [
  { text: "农产品", value: 1 },
  { text: "爆品", value: 2 },
];

export const TodayGoodsList = () => {
  const [params, setParams] = useTodayGoodsListSearchParams();
  const { isLoading, error, data } = useTodayGoodsList(params);

  return (
    <Container>
      <Main>
        <List
          typeOptions={typeOptions}
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
      <TodayGoodsModal typeOptions={typeOptions} />
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