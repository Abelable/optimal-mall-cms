import { Row } from "components/lib";
import { Button, Select } from "antd";

import { useState } from "react";
import styled from "@emotion/styled";

import type { Option } from "types/common";
import type { ActivityListSearchParams } from "types/activity";

export interface SearchPanelProps {
  statusOptions: Option[];
  typeOptions: Option[];
  params: Partial<ActivityListSearchParams>;
  setParams: (params: Partial<ActivityListSearchParams>) => void;
}

const defaultParmas: Partial<ActivityListSearchParams> = {
  status: undefined,
  goodsType: undefined,
};

export const SearchPanel = ({
  statusOptions,
  typeOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setStatus = (status: number) =>
    setTempParams({ ...tempParams, status });
  const clearStatus = () => setTempParams({ ...tempParams, status: undefined });

  const setGoodsType = (goodsType: number) =>
    setTempParams({ ...tempParams, goodsType });
  const clearGoodsType = () =>
    setTempParams({ ...tempParams, goodsType: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>活动状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择活动状态"
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
        <div>商品类型：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.goodsType}
          placeholder="请选择商品类型"
          allowClear={true}
          onSelect={setGoodsType}
          onClear={clearGoodsType}
        >
          {typeOptions?.map(({ text, value }) => (
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
