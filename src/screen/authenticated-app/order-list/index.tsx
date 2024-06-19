import styled from "@emotion/styled";

import { useOrderList } from "service/order";
import { toNumber } from "utils";
import { useOrderListSearchParams } from "./util";

import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

export const OrderList = () => {
  const [params, setParams] = useOrderListSearchParams();
  const { isLoading, error, data } = useOrderList(params);

  const statusOptions = [
    { text: "待付款", value: 101 },
    { text: "用户取消", value: 102 },
    { text: "系统取消", value: 103 },
    { text: "管理员取消", value: 104 },
    { text: "待发货", value: 201 },
    { text: "待退款", value: 202 },
    { text: "退款成功", value: 203 },
    { text: "待收货", value: 301 },
    { text: "用户签收", value: 401 },
    { text: "系统签收", value: 402 },
    { text: "已完成", value: 501 },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          statusOptions={statusOptions}
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
      <RejectModal />
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
