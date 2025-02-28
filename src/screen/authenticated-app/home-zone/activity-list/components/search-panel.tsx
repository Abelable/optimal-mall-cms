import { GoodsCover, Row } from "components/lib";
import { Button, Input, Select } from "antd";

import { useState } from "react";
import styled from "@emotion/styled";

import type { Option } from "types/common";
import type { ActivityListSearchParams } from "types/activity";
import type { GoodsOption } from "types/goods";

export interface SearchPanelProps {
  statusOptions: Option[];
  tagOptions: { id: number; name: string }[];
  goodsTagOptions: Option[];
  goodsOptions: GoodsOption[];
  params: Partial<ActivityListSearchParams>;
  setParams: (params: Partial<ActivityListSearchParams>) => void;
}

const defaultParmas: Partial<ActivityListSearchParams> = {
  name: "",
  status: undefined,
  tag: undefined,
  goodsTag: undefined,
  goodsId: undefined,
};

export const SearchPanel = ({
  statusOptions,
  tagOptions,
  goodsTagOptions,
  goodsOptions,
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

  const setTag = (tag: number) => setTempParams({ ...tempParams, tag });
  const clearTag = () => setTempParams({ ...tempParams, tag: undefined });

  const setGoodsTag = (goodsTag: number) =>
    setTempParams({ ...tempParams, goodsTag });
  const clearGoodsTag = () =>
    setTempParams({ ...tempParams, goodsTag: undefined });

  const setGoodsId = (goodsId: number) =>
    setTempParams({ ...tempParams, goodsId });
  const clearGoodsId = () =>
    setTempParams({ ...tempParams, goodsId: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>活动标签：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.tag}
          placeholder="请选择活动标签"
          allowClear
          onSelect={setTag}
          onClear={clearTag}
        >
          {tagOptions?.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>活动状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择活动状态"
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
        <div>活动名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.name}
          onChange={setName}
          placeholder="请输入活动名称"
          allowClear
        />
      </Item>
      <Item>
        <div>商品标签：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.goodsTag}
          placeholder="请选择商品标签"
          allowClear
          onSelect={setGoodsTag}
          onClear={clearGoodsTag}
        >
          {goodsTagOptions?.map(({ text, value }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>对应商品：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.goodsId}
          placeholder="请选择对应商品"
          allowClear
          onSelect={setGoodsId}
          onClear={clearGoodsId}
          showSearch
          filterOption={(input, option) =>
            (option!.children as any)[1].props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {goodsOptions.map(({ id, cover, name }) => (
            <Select.Option key={id} value={id}>
              <GoodsCover src={cover} />
              <span>{name}</span>
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
