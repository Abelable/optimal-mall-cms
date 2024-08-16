import { OptionAvatar, Row } from "components/lib";
import { Button, Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useState } from "react";
import styled from "@emotion/styled";

import type { Option } from "types/common";
import type { SuperiorOption, UsersSearchParams } from "types/user";

export interface SearchPanelProps {
  params: Partial<UsersSearchParams>;
  setParams: (params: Partial<UsersSearchParams>) => void;
  levelOptions: Option[];
  superiorOptions: SuperiorOption[];
}

const defaultParmas: Partial<UsersSearchParams> = {
  nickname: "",
  mobile: "",
  level: undefined,
  superiorId: undefined,
};

export const SearchPanel = ({
  params,
  setParams,
  levelOptions,
  superiorOptions,
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

  const setLevel = (level: number) => setTempParams({ ...tempParams, level });
  const clearLevel = () => setTempParams({ ...tempParams, level: undefined });

  const setSuperiorId = (superiorId: number) =>
    setTempParams({ ...tempParams, superiorId });
  const clearSuperiorId = () =>
    setTempParams({ ...tempParams, superiorId: undefined });

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
      <Item>
        <div>用户身份：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.level}
          placeholder="请选择用户身份"
          allowClear={true}
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
      <Item>
        <div>用户上级：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.superiorId}
          placeholder="请选择用户上级"
          allowClear={true}
          onSelect={setSuperiorId}
          onClear={clearSuperiorId}
          showSearch
          filterOption={(input, option) =>
            (option!.children as any)[1].props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {superiorOptions?.map(({ id, avatar, nickname }) => (
            <Select.Option key={id} value={id}>
              <OptionAvatar src={avatar} icon={<UserOutlined />} />
              <span>{nickname}</span>
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
