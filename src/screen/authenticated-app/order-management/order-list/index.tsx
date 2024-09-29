import { useState } from "react";
import styled from "@emotion/styled";

import { useCancelOrder, useDeleteOrder, useOrderList } from "service/order";
import { toNumber } from "utils";
import { useOrderListQueryKey, useOrderListSearchParams } from "./util";

import { Drawer, Select, Button, Modal } from "antd";
import { Row } from "components/lib";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { OrderModal } from "./components/order-modal";
import { DeliveryModal } from "./components/delivery-modal";
import { ShippingModal } from "./components/shipping-modal";

const statusOptions = [
  { text: "待付款", value: 101 },
  { text: "用户取消", value: 102 },
  { text: "系统取消", value: 103 },
  { text: "管理员取消", value: 104 },
  { text: "待发货", value: 201 },
  { text: "待收货", value: 301 },
  { text: "用户签收", value: 401 },
  { text: "系统签收", value: 402 },
  { text: "完成评价", value: 501 },
];
const batchOprationOptions = [
  { name: "批量发货", value: 1 },
  { name: "取消订单", value: 2 },
  { name: "删除订单", value: 3 },
];

const expressOptions = [
  { name: "中通快递", value: "ZTO" },
  { name: "圆通速递", value: "YTO" },
  { name: "韵达速递", value: "YD" },
  { name: "申通快递", value: "STO" },
  { name: "顺丰速运", value: "SF" },
  { name: "京东快递", value: "JD" },
  { name: "邮政快递包裹", value: "YZPY" },
  { name: "EMS", value: "EMS" },
  { name: "极兔速递", value: "JTSD" },
  { name: "德邦快递", value: "DBL" },
  { name: "丰网速运", value: "FWX" },
  { name: "百世快递", value: "HTKY" },
  { name: "优速快递", value: "UC" },
  { name: "众邮快递", value: "ZYE" },
  { name: "宅急送", value: "ZJS" },
];

export const OrderList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [batchOprationType, setBatchOprationType] = useState(-1);
  const [params, setParams] = useOrderListSearchParams();
  const { isLoading, error, data } = useOrderList(params);
  const { mutate: cancelOrder } = useCancelOrder(useOrderListQueryKey());
  const { mutate: deleteOrder } = useDeleteOrder(useOrderListQueryKey());

  const selectBatchOprationType = () => (type: number) => {
    setBatchOprationType(type);
  };
  const batchOprate = () => {
    switch (batchOprationType) {
      case 1:
        console.log("selectedRowKeys", selectedRowKeys);
        break;

      case 2:
        Modal.confirm({
          title: "确定批量取消该订单吗？",
          content: "点击确定取消",
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            const ids = selectedRowKeys.filter((id) =>
              data?.list
                .filter((item) => item.status === 101)
                .map((item) => item.id)
                .includes(id)
            );
            cancelOrder(ids);
            setSelectedRowKeys([]);
          },
        });
        break;

      case 3:
        Modal.confirm({
          title: "确定批量删除该订单吗？",
          content: "点击确定删除",
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            const ids = selectedRowKeys.filter((id) =>
              data?.list
                .filter((item) => [102, 103, 104].includes(item.status))
                .map((item) => item.id)
                .includes(id)
            );
            deleteOrder(ids);
            setSelectedRowKeys([]);
          },
        });
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
          bordered
        />
      </Main>
      <Drawer
        open={!!selectedRowKeys.length}
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
              allowClear
              onSelect={selectBatchOprationType()}
              placeholder="批量操作"
            >
              {batchOprationOptions.map(({ name, value }) => (
                <Select.Option key={value} value={value}>
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
      <OrderModal statusOptions={statusOptions} />
      <DeliveryModal expressOptions={expressOptions} />
      <ShippingModal />
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
