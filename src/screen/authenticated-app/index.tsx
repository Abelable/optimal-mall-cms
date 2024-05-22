import { useState } from "react";
import { useRouteType } from "utils/url";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { useUserInfo } from "service/auth";
import { HashRouter as Router, Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps } from "antd";
import { NavigationBar } from "components/navigation-bar";

import { RoleList } from "./admin/role-list";
import { AdminList } from "./admin/admin-list";
import { UserList } from "./user/user-list";
import { ExpressList } from "./shopping/express-list";
import { GoodsCategoryList } from "./shopping/goods/category-list";
import { GoodsList } from "./shopping/goods/goods-list";
import { MallBannerList } from "./activity/mall-banner-list";

import {
  LockOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretDownOutlined,
  MehOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  VerifiedOutlined,
  UserOutlined,
  GiftOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { ExpressIcon } from "assets/icon";
import logo from "assets/images/logo.png";
import { UserInfo } from "types/auth";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: userInfo } = useUserInfo();
  const { logout } = useAuth();

  return (
    <Router>
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <MenuSider collapsed={collapsed} />
        <Layout>
          <Header>
            <Row>
              <Trigger collapsed={collapsed} setCollapsed={setCollapsed} />
              <NavigationBar />
            </Row>
            <User userInfo={userInfo} logout={logout} />
          </Header>
          <Content>
            <Routes>
              <Route path="auth/role_list" element={<RoleList />} />
              <Route path="auth/admin_list" element={<AdminList />} />
              <Route path="user/list" element={<UserList />} />
              <Route path="activity/mall_banner" element={<MallBannerList />} />
              <Route path="shopping/express_list" element={<ExpressList />} />
              <Route
                path="shopping/goods/category_list"
                element={<GoodsCategoryList />}
              />
              <Route path="shopping/goods/list" element={<GoodsList />} />
              <Route
                path={"*"}
                element={<Navigate to={"user/list"} replace={true} />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const MenuSider = ({ collapsed }: { collapsed: boolean }) => {
  const { defaultOpenKey, selectedKey } = useRouteType();

  const items: MenuProps["items"] = [
    {
      label: "权限管理",
      key: "auth",
      icon: <LockOutlined />,
      children: [
        {
          label: <Link to={"auth/role_list"}>角色列表</Link>,
          key: "auth_role_list",
          icon: <MehOutlined />,
        },
        {
          label: <Link to={"auth/admin_list"}>管理员列表</Link>,
          key: "auth_admin_list",
          icon: <TeamOutlined />,
        },
      ],
    },
    {
      label: "用户管理",
      key: "user",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link to={"user/list"}>用户列表</Link>,
          key: "user_list",
          icon: <TeamOutlined />,
        },
        {
          label: <Link to={"user/auth_info_list"}>实名认证</Link>,
          key: "user_auth_info_list",
          icon: <VerifiedOutlined />,
        },
      ],
    },
    {
      label: "活动管理",
      key: "activity",
      icon: <GiftOutlined />,
      children: [
        {
          label: <Link to={"activity/mall_banner"}>商城Banner</Link>,
          key: "activity_mall_banner",
          icon: <PictureOutlined />,
        },
      ],
    },
    {
      label: "电商模块",
      key: "shopping",
      icon: <ShoppingOutlined />,
      children: [
        {
          label: <Link to={"shopping/express_list"}>快递列表</Link>,
          key: "shopping_express_list",
          icon: <ExpressIcon />,
        },
        {
          label: "商品管理",
          key: "shopping_goods",
          icon: <ShoppingOutlined />,
          children: [
            {
              label: <Link to={"shopping/goods/category_list"}>商品分类</Link>,
              key: "shopping_goods_category_list",
              icon: <AppstoreOutlined />,
            },
            {
              label: <Link to={"shopping/goods/list"}>商品列表</Link>,
              key: "shopping_goods_list",
              icon: <UnorderedListOutlined />,
            },
          ],
        },
      ],
    },
  ];

  return (
    <Layout.Sider
      style={{ overflowY: "scroll" }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Link to={"/"}>
        <Logo collapsed={collapsed}>
          <LogoImg src={logo} />
          <div>有播甄选管理后台</div>
        </Logo>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={[defaultOpenKey]}
        selectedKeys={[selectedKey]}
        items={items}
      />
    </Layout.Sider>
  );
};

interface Collapsed {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Trigger = ({ collapsed, setCollapsed }: Collapsed) => {
  return (
    <div onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? <Unfold /> : <Fold />}
    </div>
  );
};

const User = ({
  userInfo,
  logout,
}: {
  userInfo: UserInfo | undefined;
  logout: () => void;
}) => {
  const items: MenuProps["items"] = [
    {
      label: (
        <Button type={"link"} onClick={logout}>
          登出
        </Button>
      ),
      key: "logout",
    },
  ];

  return (
    <Row gap={1} style={{ cursor: "pointer" }}>
      <Avatar src={userInfo?.avatar} />
      <div>{userInfo?.nickname}</div>
      <Dropdown overlay={<Menu items={items} />}>
        <CaretDownOutlined style={{ fontSize: "1.2rem" }} />
      </Dropdown>
    </Row>
  );
};

const Logo = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;
  padding-left: ${(props) => (props.collapsed ? "2.6rem" : "1.6rem")};
  transition: padding-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  > div {
    margin-left: 1rem;
    flex: 1;
    height: 2.2rem;
    color: #fff;
    overflow: hidden;
    opacity: ${(props) => (props.collapsed ? 0 : 1)};
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

const LogoImg = styled.img<{ size?: number }>`
  width: ${(props) => (props.size ? props.size + "rem" : "2.8rem")};
  height: ${(props) => (props.size ? props.size + "rem" : "2.8rem")};
  border-radius: 50%;
  cursor: pointer;
`;

const Header = styled(Layout.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 2.4rem;
  background: #fff;
  box-shadow: 0 2px 4px rgb(0 21 41 / 8%);
  z-index: 10;
`;

const Unfold = styled(MenuUnfoldOutlined)`
  padding: 0 2.4rem;
  font-size: 1.8rem;
  line-height: 6.4rem;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;
const Fold = Unfold.withComponent(MenuFoldOutlined);

const Content = styled(Layout.Content)`
  height: 100%;
`;
