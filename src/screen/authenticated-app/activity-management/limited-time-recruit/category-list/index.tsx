import styled from "@emotion/styled";
import { useRuralRegionList } from "service/ruralRegion";
import { toNumber } from "utils";
import { List } from "./components/list";
import { CategoryModal } from "./components/category-modal";
import { useCategoryListSearchParams } from "./util";

export const LimitedTimeRecruitCategoryList = () => {
  const [params, setParams] = useCategoryListSearchParams();
  const { isLoading, error, data } = useRuralRegionList(params);

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
      <CategoryModal />
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
