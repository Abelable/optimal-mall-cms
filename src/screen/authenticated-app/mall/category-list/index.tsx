import styled from "@emotion/styled";
import { toNumber } from "utils";
import { useCategoriesSearchParams } from "./util";
import { useCategories } from "service/category";

import { List } from "./components/list";
import { CategoryModal } from "./components/category-modal";

export const CategoryList = () => {
  const [params, setParams] = useCategoriesSearchParams();
  const { isLoading, error, data } = useCategories(params);

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
