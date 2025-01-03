import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { BindModal } from "./components/bind-modal";

import styled from "@emotion/styled";
import { useUsers } from "service/user";
import { usePromoterOptions } from "service/promoter";
import { toNumber } from "utils";
import { useUsersSearchParams } from "./util";

export const UserList = () => {
  const [params, setParams] = useUsersSearchParams();
  const { isLoading, error, data } = useUsers(params);
  const { data: superiorOptions = [], error: superiorError } =
    usePromoterOptions();

  return (
    <Container>
      <Main>
        <SearchPanel
          superiorOptions={superiorOptions}
          params={params}
          setParams={setParams}
        />
        <List
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
      <BindModal superiorOptions={superiorOptions} />
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
