import type { MerchantListSearchParams } from "types/merchant";
import { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Input } from "antd";

export interface SearchPanelProps {
  params: Partial<MerchantListSearchParams>;
  setParams: (params: Partial<MerchantListSearchParams>) => void;
}

const defaultParmas: Partial<MerchantListSearchParams> = {
  name: "",
  consigneeName: "",
  mobile: "",
};

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
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

  const setConsigneeName = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        consigneeName: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      consigneeName: evt.target.value,
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
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>商家名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.name}
          onChange={setName}
          placeholder="请输入商家名称"
          allowClear
        />
      </Item>
      <Item>
        <div>收件人姓名：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.consigneeName}
          onChange={setConsigneeName}
          placeholder="请输入收件人姓名"
          allowClear
        />
      </Item>
      <Item>
        <div>收件人手机号：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.mobile}
          onChange={setMobile}
          placeholder="请输入收件人手机号"
          allowClear
        />
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
