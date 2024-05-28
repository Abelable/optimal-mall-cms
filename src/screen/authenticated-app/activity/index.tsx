import styled from "@emotion/styled";
import { useBannerList } from "service/mallBanner";
import { toNumber } from "utils";
import { useBannerListSearchParams } from "./util";
import { MallBannerModal } from "./components/banner-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

const sceneOptions = [
  { text: "H5活动", value: 1 },
  { text: "商品详情", value: 2 },
];

export const BannerList = () => {
  const [params, setParams] = useBannerListSearchParams();
  const { isLoading, error, data } = useBannerList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          sceneOptions={sceneOptions}
          params={params}
          setParams={setParams}
        />
        <List
          sceneOptions={sceneOptions}
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
        />
      </Main>
      <MallBannerModal sceneOptions={sceneOptions} />
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
