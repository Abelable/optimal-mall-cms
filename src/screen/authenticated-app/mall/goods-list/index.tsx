import styled from "@emotion/styled";
import { GoodsModal } from "./components/goods-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

import { useGoodsCategoryOptions } from "service/goodsCategory";
import { useGoodsList } from "service/goods";
import { useFreightTemplateOptions } from "service/freigthTemplate";
import { useMerchantOptions } from "service/merchant";
import { toNumber } from "utils";
import { useGoodsListSearchParams } from "./util";

export const GoodsList = () => {
  const [params, setParams] = useGoodsListSearchParams();
  const { isLoading, error, data } = useGoodsList(params);
  const { data: categoryOptions = [], error: categoryOptionsError } =
    useGoodsCategoryOptions();

  const {
    data: originalFreightTemplateOptions = [],
    error: freightTemplateOptionsError,
  } = useFreightTemplateOptions();
  const freightTemplateOptions = [
    { id: 0, name: "全国包邮" },
    ...originalFreightTemplateOptions,
  ];

  const { data: originalMerchantOptions = [], error: merchantOptionsError } =
    useMerchantOptions();
  const merchantOptions = [{ id: 0, name: "自营" }, ...originalMerchantOptions];

  const statusOptions = [
    { text: "售卖中", value: 1 },
    { text: "已下架", value: 2 },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          categoryOptions={categoryOptions || []}
          merchantOptions={merchantOptions}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          categoryOptions={categoryOptions || []}
          merchantOptions={merchantOptions}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
          error={
            error ||
            categoryOptionsError ||
            freightTemplateOptionsError ||
            merchantOptionsError
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
        categoryOptions={categoryOptions}
        freightTemplateOptions={freightTemplateOptions}
        merchantOptions={merchantOptions}
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
