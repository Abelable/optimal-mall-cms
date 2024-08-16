import styled from "@emotion/styled";
import { useUsers } from "service/user";
import { toNumber } from "utils";
import { useUsersSearchParams } from "./util";
import { UserModal } from "./components/user-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

const levelOptions = [
  { name: "普通用户", value: 0 },
  { name: "乡村推广员", value: 1 },
  { name: "乡村组织者C1", value: 2 },
  { name: "乡村组织者C2", value: 3 },
  { name: "乡村组织者C3", value: 4 },
  { name: "乡村委员会", value: 5 },
];

export const UserList = () => {
  const [params, setParams] = useUsersSearchParams();
  const { isLoading, error, data } = useUsers(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          levelOptions={levelOptions}
          params={params}
          setParams={setParams}
        />
        <List
          levelOptions={levelOptions}
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
