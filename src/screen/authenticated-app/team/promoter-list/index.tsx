import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { useUsers } from "service/user";
import { usePromoterOptions } from "service/promoter";
import { toNumber } from "utils";
import { usePromoterListSearchParams } from "./util";

const levelOptions = [
  { text: "推广员", value: 1 },
  { text: "组织者C1", value: 2 },
  { text: "组织者C2", value: 3 },
  { text: "组织者C3", value: 4 },
  { text: "委员会", value: 5 },
];

export const PromoterList = () => {
  const [params, setParams] = usePromoterListSearchParams();
  const { isLoading, error, data } = useUsers(params);
  const { data: superiorOptions = [], error: superiorError } =
    usePromoterOptions();

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
          error={error || superiorError}
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
