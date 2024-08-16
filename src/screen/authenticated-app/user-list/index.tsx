import styled from "@emotion/styled";
import { useSuperiorOptions, useUsers } from "service/user";
import { toNumber } from "utils";
import { useUsersSearchParams } from "./util";
import { UserModal } from "./components/user-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

const levelOptions = [
  { text: "普通用户", value: 0 },
  { text: "乡村推广员", value: 1 },
  { text: "乡村组织者C1", value: 2 },
  { text: "乡村组织者C2", value: 3 },
  { text: "乡村组织者C3", value: 4 },
  { text: "乡村委员会", value: 5 },
];

export const UserList = () => {
  const [params, setParams] = useUsersSearchParams();
  const { isLoading, error, data } = useUsers(params);
  const { data: superiorOptions = [], error: teamLeaderError } =
    useSuperiorOptions();

  return (
    <Container>
      <Main>
        <SearchPanel
          levelOptions={levelOptions}
          superiorOptions={superiorOptions}
          params={params}
          setParams={setParams}
        />
        <List
          levelOptions={levelOptions}
          superiorOptions={superiorOptions}
          params={params}
          setParams={setParams}
          error={error || teamLeaderError}
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
      <UserModal />
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
