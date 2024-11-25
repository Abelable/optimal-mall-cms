import styled from "@emotion/styled";

import { useWithdrawList } from "service/withdraw";
import { toNumber } from "utils";
import { useWithdrawListSearchParams } from "./util";

import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";
import { WithdrawModal } from "./components/withdraw-modal";

const statusOptions = [
  { text: "待审核", value: 0 },
  { text: "已提现", value: 1 },
  { text: "已驳回", value: 2 },
];

export const WithdrawList = () => {
  const [params, setParams] = useWithdrawListSearchParams();
  const { isLoading, error, data } = useWithdrawList(params);

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
          bordered
        />
      </Main>
      <WithdrawModal statusOptions={statusOptions} />
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
