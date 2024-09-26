import styled from "@emotion/styled";
import { useEnterpriseInfoList } from "service/enterpriseInfo";
import { toNumber } from "utils";
import { useEnterpriseInfoListSearchParams } from "./util";

import { EnterpriseInfoModal } from "./components/info-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

const statusOptions = [
  { text: "待审核", value: 0 },
  { text: "审核通过", value: 1 },
  { text: "已驳回", value: 2 },
];

export const EnterpriseInfoList = () => {
  const [params, setParams] = useEnterpriseInfoListSearchParams();
  const { isLoading, error, data } = useEnterpriseInfoList(params);

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
            current: toNumber(data?.page) || 1 || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <EnterpriseInfoModal />
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
