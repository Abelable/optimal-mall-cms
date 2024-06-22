import { useState } from "react";
import styled from "@emotion/styled";

import { useOrderList } from "service/order";
import { toNumber } from "utils";
import { useOrderListSearchParams } from "./util";

import { Drawer, Select, Button } from "antd";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";
import { Row } from "components/lib";

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
];

export const OrderList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [batchOprationType, setBatchOprationType] = useState(-1);
  const [params, setParams] = useOrderListSearchParams();
  const { isLoading, error, data } = useOrderList(params);

  const selectBatchOprationType = () => (type: number) => {
    setBatchOprationType(type);
  };
  const batchOprate = () => {
    switch (batchOprationType) {
      case 1:
        console.log("batchOprationType", batchOprationType);
        break;

      case 2:
        break;

      case 3:
        break;
    }
  };

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
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
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
      <Drawer
        visible={!!selectedRowKeys.length}
        style={{ position: "absolute" }}
        height={"8rem"}
        placement="bottom"
        mask={false}
        getContainer={false}
        closable={false}
      >
        <Row between={true}>
          <div>
            已选择 <SelectedCount>{selectedRowKeys.length}</SelectedCount> 项
          </div>
          <Row gap>
            <Select
              style={{ width: "14rem" }}
              allowClear={true}
              placeholder="批量操作"
            >
              {[
                { name: "批量发货", value: 1 },
                { name: "取消订单", value: 2 },
                { name: "删除订单", value: 3 },
              ].map(({ name, value }) => (
                <Select.Option
                  key={value}
                  value={value}
                  onSelect={selectBatchOprationType()}
                >
                  {name}
                </Select.Option>
              ))}
            </Select>
            <Button
              onClick={() => batchOprate()}
              style={{ marginRight: 0 }}
              type={"primary"}
            >
              确定
            </Button>
          </Row>
        </Row>
      </Drawer>
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

const SelectedCount = styled.span`
  color: #1890ff;
  font-weight: 600;
`;
