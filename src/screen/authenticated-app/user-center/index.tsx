import { useState } from "react";
import styled from "@emotion/styled";

import { Menu } from "antd";

export const UserCenter = () => {
  const [selectKey, setSelectKey] = useState("base");
  return (
    <Container>
      <Main>
        <Menu
          items={[
            {
              key: "base",
              label: "基本设置",
            },
            {
              key: "security",
              label: "安全设置",
            },
            {
              key: "notification",
              label: "消息设置",
            },
          ]}
          selectedKeys={[selectKey]}
          onClick={({ key }: { key: string }) => setSelectKey(key)}
        />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 2.4rem;
  height: 100%;
`;
const Main = styled.div`
  position: relative;
  padding: 2.4rem;
  height: 100%;
  background: #fff;
  border-radius: 0.6rem;
`;
