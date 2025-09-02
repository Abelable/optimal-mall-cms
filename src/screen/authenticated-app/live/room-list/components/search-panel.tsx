import { OptionAvatar, Row } from "components/lib";
import { Button, Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useState } from "react";
import styled from "@emotion/styled";

import type { Option } from "types/common";
import type { LiveRoomListSearchParams } from "types/liveRoom";

export interface SearchPanelProps {
  statusOptions: Option[];
  userOptions: {
    id: number;
    userId: number;
    avatar: string;
    nickname: string;
  }[];
  params: Partial<LiveRoomListSearchParams>;
  setParams: (params: Partial<LiveRoomListSearchParams>) => void;
}

const defaultParmas: Partial<LiveRoomListSearchParams> = {
  status: undefined,
  title: "",
  userId: undefined,
};

export const SearchPanel = ({
  userOptions,
  statusOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setStatus = (status: number) =>
    setTempParams({ ...tempParams, status });
  const clearStatus = () => setTempParams({ ...tempParams, status: undefined });

  const setTitle = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        title: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      title: evt.target.value,
    });
  };

  const setUser = (userId: number) => setTempParams({ ...tempParams, userId });
  const clearUser = () => setTempParams({ ...tempParams, userId: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>直播状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择直播状态"
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
        <div>直播标题：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.title}
          onChange={setTitle}
          placeholder="请输入直播标题"
          allowClear
        />
      </Item>
      <Item>
        <div>直播用户：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.userId}
          placeholder="请选择用户"
          allowClear
          onSelect={setUser}
          onClear={clearUser}
          showSearch
          filterOption={(input, option) =>
            (option!.children as any)[1].props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {userOptions?.map(({ userId, avatar, nickname }) => (
            <Select.Option key={userId} value={userId}>
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
