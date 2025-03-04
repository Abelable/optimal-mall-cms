import { useState } from "react";
import styled from "@emotion/styled";

import { Form, Input, Menu } from "antd";
import { useForm } from "antd/es/form/Form";
import { OssUpload } from "components/oss-upload";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const UserCenter = () => {
  const [form] = useForm();
  const [selectKey, setSelectKey] = useState("base");
  const menuOptions = [
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
  ];
  return (
    <Container>
      <Main>
        <Menu
          style={{ width: "22.4rem", height: "100%" }}
          items={menuOptions}
          selectedKeys={[selectKey]}
          onClick={({ key }: { key: string }) => setSelectKey(key)}
        />
        <Content>
          <Title>
            {menuOptions.find((item) => item.key === selectKey)?.label}
          </Title>
          <Form
            style={{ marginTop: "2rem", width: "40rem" }}
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="avatar"
              label="头像"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <OssUpload maxCount={1} />
            </Form.Item>
            <Form.Item name="nickname" label="昵称">
              <Input placeholder="请输入昵称" />
            </Form.Item>
          </Form>
        </Content>
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
  display: flex;
  padding: 2.4rem;
  height: 100%;
  background: #fff;
  border-radius: 0.6rem;
`;
const Content = styled.div`
  padding: 0.8rem 4rem;
  flex: 1;
`;
const Title = styled.div`
  color: rgba(0, 0, 0, 0.88);
  font-size: 2rem;
  font-weight: 500;
`;
