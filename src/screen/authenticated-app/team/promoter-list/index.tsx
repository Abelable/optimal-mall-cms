import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { usePromoterList } from "service/promoter";
import { toNumber } from "utils";
import { usePromoterListSearchParams } from "./util";
import { useUserOptions } from "service/user";
import { PromoterModal } from "./components/promoter-modal";

const levelOptions = [
  { text: "乡村振兴推广员", value: 1, scene: 100 },
  { text: "乡村振兴服务商C1", value: 2, scene: 201 },
  { text: "乡村振兴服务商C2", value: 3, scene: 202 },
  { text: "乡村振兴服务商C3", value: 4, scene: 203 },
  { text: "乡村振兴委员会", value: 5, scene: 300 },
];

export const PromoterList = () => {
  const [params, setParams] = usePromoterListSearchParams();
  const { isLoading, error, data } = usePromoterList(params);
  const { data: userOptions = [], error: userOptionsError } = useUserOptions();

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
          error={error || userOptionsError}
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

      <PromoterModal userOptions={userOptions} levelOptions={levelOptions} />
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
