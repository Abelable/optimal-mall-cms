import { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Input, Select } from "antd";

import type { OrderListSearchParams } from "types/order";

export interface SearchPanelProps {
  statusOptions: { text: string; value: number }[];
  params: Partial<OrderListSearchParams>;
  setParams: (params: Partial<OrderListSearchParams>) => void;
}

const defaultParmas: Partial<OrderListSearchParams> = {
  orderSn: "",
  status: undefined,
  consignee: "",
  mobile: "",
};

export const SearchPanel = ({
  statusOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setOrderSn = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        orderSn: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      orderSn: evt.target.value,
    });
  };

  const setStatus = (status: number) =>
    setTempParams({ ...tempParams, status });
  const clearStatus = () => setTempParams({ ...tempParams, status: undefined });

  const setConsignee = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        consignee: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      consignee: evt.target.value,
    });
  };

  const setMobile = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        mobile: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      mobile: evt.target.value,
    });
  };

  const clear = () => {
    setParams({ ...params, ...defaultParmas });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>订单编号：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.orderSn}
          onChange={setOrderSn}
          placeholder="请输入订单编号"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>订单状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择订单状态"
          allowClear={true}
          onSelect={setStatus}
          onClear={clearStatus}
        >
          {statusOptions?.map(({ text, value }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>收件人姓名：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.consignee}
          onChange={setConsignee}
          placeholder="请输入收件人姓名"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>收件人手机号：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.mobile}
          onChange={setMobile}
          placeholder="请输入收件人手机号"
          allowClear={true}
        />
      </Item>

      <ButtonWrap gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button
          type={"primary"}
          style={{ marginRight: 0 }}
          onClick={() => setParams({ ...params, ...tempParams })}
        >
          查询
        </Button>
      </ButtonWrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.6rem;
  padding: 2.4rem 16.8rem 0 2.4rem;
  background: #fff;
`;

const Item = styled(Row)`
  margin-right: 2rem;
  padding-bottom: 2.4rem;
`;

const ButtonWrap = styled(Row)`
  position: absolute;
  right: 2.4rem;
  bottom: 2.4rem;
`;
