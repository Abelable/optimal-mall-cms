import { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Select } from "antd";

import type { Option } from "types/common";
import type { WithdrawListSearchParams } from "types/withdraw";

export interface SearchPanelProps {
  statusOptions: Option[];
  sceneOptions: Option[];
  pathOptions: Option[];
  params: Partial<WithdrawListSearchParams>;
  setParams: (params: Partial<WithdrawListSearchParams>) => void;
}

const defaultParmas: Partial<WithdrawListSearchParams> = {
  status: undefined,
  scene: undefined,
  path: undefined,
};

export const SearchPanel = ({
  statusOptions,
  sceneOptions,
  pathOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setStatus = (status: number) =>
    setTempParams({ ...tempParams, status });
  const clearStatus = () => setTempParams({ ...tempParams, status: undefined });

  const setScene = (scene: number) => setTempParams({ ...tempParams, scene });
  const clearScene = () => setTempParams({ ...tempParams, scene: undefined });

  const setPath = (path: number) => setTempParams({ ...tempParams, path });
  const clearPath = () => setTempParams({ ...tempParams, path: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择状态"
          allowClear
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
        <div>佣金场景：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.scene}
          placeholder="请选择佣金场景"
          allowClear
          onSelect={setScene}
          onClear={clearScene}
        >
          {sceneOptions?.map(({ text, value }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>提现方式：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.path}
          placeholder="请选择提现方式"
          allowClear
          onSelect={setPath}
          onClear={clearPath}
        >
          {pathOptions?.map(({ text, value }) => (
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
          onClick={() => setParams({ ...params, ...tempParams, page: 1 })}
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
  border-radius: 0.6rem;
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
