import styled from "@emotion/styled";

import { useGoodsCategoryOptions } from "service/goodsCategory";
import { useGoodsList } from "service/goods";
import { toNumber } from "utils";
import { useGoodsListSearchParams } from "./util";

import { GoodsModal } from "./components/goods-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";
import { useFreightTemplateOptions } from "service/freigthTemplate";

export const GoodsList = () => {
  const [params, setParams] = useGoodsListSearchParams();
  const { isLoading, error, data } = useGoodsList(params);
  const { data: goodsCategoryOptions, error: goodsCategoryOptionsError } =
    useGoodsCategoryOptions();
  const {
    data: freightTemplateOptions = [],
    error: freightTemplateOptionsError,
  } = useFreightTemplateOptions();
  const statusOptions = [
    { text: "售卖中", value: 1 },
    { text: "已下架", value: 2 },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          categoryOptions={goodsCategoryOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          categoryOptions={goodsCategoryOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
          error={
            error || goodsCategoryOptionsError || freightTemplateOptionsError
          }
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <GoodsModal
        categoryOptions={goodsCategoryOptions || []}
        freightTemplateOptions={[
          { id: 0, name: "全国包邮" },
          ...freightTemplateOptions,
        ]}
      />
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
