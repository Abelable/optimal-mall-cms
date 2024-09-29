import styled from "@emotion/styled";

import { useRefundList } from "service/refund";
import { toNumber } from "utils";
import { useRefundListSearchParams } from "./util";

import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";
import { RefundModal } from "./components/refund-modal";
import { ShippingModal } from "./components/shipping-modal";

const statusOptions = [
  { text: "待审核", value: 0 },
  { text: "同意退货，待寄回", value: 1 },
  { text: "已寄出，待确认", value: 2 },
  { text: "退款成功", value: 3 },
  { text: "已驳回", value: 4 },
];

// const expressOptions = [
//   { name: "中通快递", value: "ZTO" },
//   { name: "圆通速递", value: "YTO" },
//   { name: "韵达速递", value: "YD" },
//   { name: "申通快递", value: "STO" },
//   { name: "顺丰速运", value: "SF" },
//   { name: "京东快递", value: "JD" },
//   { name: "邮政快递包裹", value: "YZPY" },
//   { name: "EMS", value: "EMS" },
//   { name: "极兔速递", value: "JTSD" },
//   { name: "德邦快递", value: "DBL" },
//   { name: "丰网速运", value: "FWX" },
//   { name: "百世快递", value: "HTKY" },
//   { name: "优速快递", value: "UC" },
//   { name: "众邮快递", value: "ZYE" },
//   { name: "宅急送", value: "ZJS" },
// ];

export const RefundList = () => {
  const [params, setParams] = useRefundListSearchParams();
  const { isLoading, error, data } = useRefundList(params);

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
          bordered
        />
      </Main>
      <RefundModal statusOptions={statusOptions} />
      <ShippingModal />
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
