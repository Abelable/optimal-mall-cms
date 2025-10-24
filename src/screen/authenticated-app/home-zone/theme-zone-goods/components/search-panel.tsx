import { Row } from "components/lib";
import { Button, Select } from "antd";

import { useState } from "react";
import styled from "@emotion/styled";

import type { GoodsListSearchParams } from "types/themeZoneGoods";

export interface SearchPanelProps {
  themeZoneOptions: { id: number; name: string }[];
  params: Partial<GoodsListSearchParams>;
  setParams: (params: Partial<GoodsListSearchParams>) => void;
}

const defaultParmas: Partial<GoodsListSearchParams> = {
  themeId: undefined,
};

export const SearchPanel = ({
  themeZoneOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setTheme = (themeId: number) =>
    setTempParams({ ...tempParams, themeId });
  const clearTheme = () => setTempParams({ ...tempParams, themeId: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>主题专区：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.themeId}
          placeholder="请选择主题专区"
          allowClear
          onSelect={setTheme}
          onClear={clearTheme}
        >
          {themeZoneOptions?.map(({ id, name }) => (
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
