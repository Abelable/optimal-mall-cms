import { ActivityModal } from "./components/activity-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useActivityList } from "service/activity";
import { toNumber } from "utils";
import { useActivityListSearchParams } from "./util";
import { SearchPanel } from "./components/search-panel";

const statusOptions = [
  { text: "活动预告", value: 0 },
  { text: "今日主推", value: 1 },
  { text: "活动结束", value: 2 },
];
const typeOptions = [
  { text: "农产品", value: 1 },
  { text: "爆品", value: 2 },
];

export const ActivityList = () => {
  const [params, setParams] = useActivityListSearchParams();
  const { isLoading, error, data } = useActivityList(params);

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
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
            showSizeChanger: true,
          }}
          bordered
        />
      </Main>
      <ActivityModal typeOptions={typeOptions} />
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