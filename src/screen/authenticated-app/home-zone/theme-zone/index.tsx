import styled from "@emotion/styled";
import { toNumber } from "utils";
import { useThemeZoneListSearchParams } from "./util";
import { useThemeZoneList } from "service/themeZone";

import { List } from "./components/list";
import { ThemeZoneModal } from "./components/theme-zone-modal";

const sceneOptions = [
  { text: "主题专区页", value: 1 },
  { text: "H5活动页", value: 2 },
  { text: "原生活动页", value: 3 },
];

export const ThemeZoneList = () => {
  const [params, setParams] = useThemeZoneListSearchParams();
  const { isLoading, error, data } = useThemeZoneList(params);

  return (
    <Container>
      <Main>
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
          bordered
        />
      </Main>
      <ThemeZoneModal sceneOptions={sceneOptions} />
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
