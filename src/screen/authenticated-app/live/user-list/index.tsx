import { LiveUserModal } from "./components/user-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useLiveUserList } from "service/liveUser";
import { toNumber } from "utils";
import { useLiveUserListSearchParams } from "./util";

export const LiveUserList = () => {
  const [params, setParams] = useLiveUserListSearchParams();
  const { isLoading, error, data } = useLiveUserList(params);

  return (
    <Container>
      <Main>
        <List
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
      <LiveUserModal />
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
