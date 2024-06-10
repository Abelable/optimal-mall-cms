import styled from "@emotion/styled";
import { useTeamLeaders } from "service/teamLeader";
import { toNumber } from "utils";
import { useTeamLeadersSearchParams } from "./util";

import { TeamLeaderModal } from "./components/team-leader-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

const typeOptions = [
  { text: "个人", value: 1 },
  { text: "企业", value: 2 },
];
const statusOptions = [
  { text: "待审核", value: 0 },
  { text: "待支付保证金", value: 1 },
  { text: "入驻成功", value: 2 },
  { text: "已驳回", value: 3 },
];

export const TeamLeaderList = () => {
  const [params, setParams] = useTeamLeadersSearchParams();
  const { isLoading, error, data } = useTeamLeaders(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          typeOptions={typeOptions}
          params={params}
          setParams={setParams}
        />
        <List
          statusOptions={statusOptions}
          typeOptions={typeOptions}
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
      <TeamLeaderModal />
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