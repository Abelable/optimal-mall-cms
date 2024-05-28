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
  name: "",
  categoryId: undefined,
  status: undefined,
};

export const SearchPanel = ({
  statusOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setName = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        name: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      name: evt.target.value,
    });
  };

  const setStatus = (status: number) =>
    setTempParams({ ...tempParams, status });
  const clearStatus = () => setTempParams({ ...tempParams, status: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>订单名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.name}
          onChange={setName}
          placeholder="请输入订单名称"
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
