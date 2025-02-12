import { ActivityModal } from "./components/activity-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { toNumber } from "utils";
import { useActivityList } from "service/activity";
import { useGoodsOptions } from "service/goods";
import { useActivityTagOptions } from "service/activityTag";
import { useActivityListSearchParams } from "./util";

const statusOptions = [
  { text: "预告", value: 0 },
  { text: "进行中", value: 1 },
  { text: "结束", value: 2 },
];
const goodsTagOptions = [
  { text: "农产品", value: 1 },
  { text: "爆品", value: 2 },
];

export const ActivityList = () => {
  const { data: goodsOptions = [], error: goodsOptionsError } =
    useGoodsOptions();
  const { data: tagOptions = [], error: tagOptionsError } =
    useActivityTagOptions();
  const [params, setParams] = useActivityListSearchParams();
  const { isLoading, error, data } = useActivityList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          tagOptions={tagOptions}
          goodsTagOptions={goodsTagOptions}
          goodsOptions={goodsOptions}
          params={params}
          setParams={setParams}
        />
        <List
          statusOptions={statusOptions}
          tagOptions={tagOptions}
          goodsTagOptions={goodsTagOptions}
          params={params}
          setParams={setParams}
          error={error || goodsOptionsError || tagOptionsError}
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
      <ActivityModal />
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
