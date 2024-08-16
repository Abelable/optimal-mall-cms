import type { UsersSearchParams } from "types/user";
import { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Input } from "antd";

export interface SearchPanelProps {
  params: Partial<UsersSearchParams>;
  setParams: (params: Partial<UsersSearchParams>) => void;
  levelOptions: { name: string; value: number }[];
}

const defaultParmas: Partial<UsersSearchParams> = {
  nickname: "",
  mobile: "",
};

export const SearchPanel = ({
  params,
  setParams,
  levelOptions,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setNickname = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        nickname: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      nickname: evt.target.value,
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
        <div>用户昵称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.nickname}
          onChange={setNickname}
          placeholder="请输入用户昵称"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>用户手机号：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.mobile}
          onChange={setMobile}
          placeholder="请输入用户手机号"
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
