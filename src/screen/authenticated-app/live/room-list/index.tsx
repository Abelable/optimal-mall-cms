import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useLiveRoomList } from "service/liveRoom";
import { toNumber } from "utils";
import { useLiveRoomListSearchParams } from "./util";
import { useLiveUserOptions } from "service/liveUser";

const statusOptions = [
  { text: "直播中", value: 1 },
  { text: "预告", value: 3 },
  { text: "已结束", value: 2 },
];

export const LiveRoomList = () => {
  const { data: userOptions = [] } = useLiveUserOptions();
  const [params, setParams] = useLiveRoomListSearchParams();
  const { isLoading, error, data } = useLiveRoomList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          userOptions={userOptions}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
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
