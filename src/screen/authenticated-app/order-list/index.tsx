import styled from "@emotion/styled";

import { useOrderList } from "service/order";
import { toNumber } from "utils";
import { useOrderListSearchParams } from "./util";

import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

export const OrderList = () => {
  const [params, setParams] = useOrderListSearchParams();
  const { isLoading, error, data } = useOrderList(params);
  const statusOptions = [
    { text: "待审核", value: 0 },
    { text: "售卖中", value: 1 },
    { text: "未过审", value: 2 },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          statusOptions={statusOptions}
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
