import styled from "@emotion/styled";
import { toNumber } from "utils";
import { useActivityTagListSearchParams } from "./util";
import { useActivityTagList } from "service/activityTag";

import { List } from "./components/list";
import { ActivityTagModal } from "./components/activity-tag-modal";

export const ActivityTagList = () => {
  const [params, setParams] = useActivityTagListSearchParams();
  const { isLoading, error, data } = useActivityTagList(params);

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
          }}
          bordered
        />
      </Main>
      <ActivityTagModal />
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
