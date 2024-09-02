import { Row } from "components/lib";
import { Button, Select } from "antd";

import { useState } from "react";
import styled from "@emotion/styled";

import type { PromoterListSearchParams } from "types/promoter";

export interface SearchPanelProps {
  params: Partial<PromoterListSearchParams>;
  setParams: (params: Partial<PromoterListSearchParams>) => void;
  levelOptions: { text: string; value: number; scene: number }[];
}

const defaultParmas: Partial<PromoterListSearchParams> = {
  level: undefined,
};

export const SearchPanel = ({
  params,
  setParams,
  levelOptions,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setLevel = (level: number) => setTempParams({ ...tempParams, level });
  const clearLevel = () => setTempParams({ ...tempParams, level: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>推广员身份：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.level}
          placeholder="请选择推广员身份"
          allowClear
          onSelect={setLevel}
          onClear={clearLevel}
        >
          {levelOptions?.map(({ text, value }) => (
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
