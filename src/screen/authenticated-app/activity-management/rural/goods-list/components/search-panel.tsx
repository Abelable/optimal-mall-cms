import { Row } from "components/lib";
import { Button, Select } from "antd";

import { useState } from "react";
import styled from "@emotion/styled";

import type { RuralGoodsListSearchParams } from "types/ruralGoods";
import type { RegionOption } from "types/region";

export interface SearchPanelProps {
  regionOptions: RegionOption[];
  params: Partial<RuralGoodsListSearchParams>;
  setParams: (params: Partial<RuralGoodsListSearchParams>) => void;
}

const defaultParmas: Partial<RuralGoodsListSearchParams> = {
  regionId: undefined,
};

export const SearchPanel = ({
  regionOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setRegion = (regionId: number) =>
    setTempParams({ ...tempParams, regionId });
  const clearRegion = () =>
    setTempParams({ ...tempParams, regionId: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>地区：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.regionId}
          placeholder="请选择地区"
          allowClear
          onSelect={setRegion}
          onClear={clearRegion}
        >
          {regionOptions?.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
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
