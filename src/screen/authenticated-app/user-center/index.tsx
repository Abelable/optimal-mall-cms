import { useState } from "react";
import styled from "@emotion/styled";

import { Button, Form, Input, Menu } from "antd";
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
          {selectKey === "base" ? (
            <div>
              <Form
                style={{ marginTop: "3rem", width: "40rem" }}
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
              <Button style={{ marginTop: "3rem" }} type={"primary"}>
                更新基本信息
              </Button>
            </div>
          ) : (
            <div style={{ marginTop: "2rem" }}>
              <SecurityItem>
                <div>
                  <SecurityTitle>账户密码</SecurityTitle>
                  <SecurityContent>当前密码强度：强</SecurityContent>
                </div>
                <Button type="link">修改</Button>
              </SecurityItem>
            </div>
          )}
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

const SecurityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 0;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
`;
const SecurityTitle = styled.div`
  color: rgba(0, 0, 0, 0.88);
  font-size: 1.4rem;
  font-weight: 500;
`;
const SecurityContent = styled.div`
  margin-top: 1rem;
  color: rgba(0, 0, 0, 0.45);
  font-size: 1.4rem;
`;
