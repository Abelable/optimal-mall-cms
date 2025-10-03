import { BannerModal } from "./components/banner-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { useBannerList } from "service/banner";
import { toNumber } from "utils";
import { useBannerListSearchParams } from "./util";

const positionOptions = [
  { text: "首页顶部头图", value: 1, tips: "图片尺寸：15 * 11" },
  { text: "首页限时活动头图", value: 2, tips: "图片尺寸：35 * 8" },
  { text: "首页弹窗", value: 3, tips: "" },
  { text: "诚信乡村页面头图", value: 4, tips: "图片尺寸：7 * 2" },
  { text: "诚信推客页面头图", value: 5, tips: "图片尺寸：5 * 4" },
];
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
          positionOptions={positionOptions}
          sceneOptions={sceneOptions}
          params={params}
          setParams={setParams}
        />
        <List
          positionOptions={positionOptions}
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
          bordered
        />
      </Main>
      <BannerModal
        positionOptions={positionOptions}
        sceneOptions={sceneOptions}
      />
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
