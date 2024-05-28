import { useState } from "react";
import { useRouteType } from "utils/url";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { useUserInfo } from "service/auth";
import { HashRouter as Router, Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps } from "antd";
import { NavigationBar } from "components/navigation-bar";

import { Dashboard } from "./dashboard";
import { UserList } from "./user-list";
import { TeamLeaderList } from "./team-leader-list";
import { BannerList } from "./banner-list";
import { MerchantList } from "./mall/merchant-list";
import { GoodsCategoryList } from "./mall/category-list";
import { GoodsList } from "./mall/goods-list";
import { OrderList } from "./order-list";
import { RoleList } from "./auth/role-list";
import { AdminList } from "./auth/admin-list";

import {
  DashboardOutlined,
  LockOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretDownOutlined,
  MehOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  GiftOutlined,
  SnippetsOutlined,
  FlagOutlined,
} from "@ant-design/icons";
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
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="user_list" element={<UserList />} />
              <Route path="team_leader_list" element={<TeamLeaderList />} />
              <Route path="banner_list" element={<BannerList />} />
              <Route path="goods/merchant_list" element={<MerchantList />} />
              <Route
                path="goods/category_list"
                element={<GoodsCategoryList />}
              />
              <Route path="goods/list" element={<GoodsList />} />
              <Route path="order_list" element={<OrderList />} />
              <Route path="auth/role_list" element={<RoleList />} />
              <Route path="auth/admin_list" element={<AdminList />} />
              <Route
                path={"*"}
                element={<Navigate to={"dashboard"} replace={true} />}
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
      label: <Link to={"dashboard"}>数据概况</Link>,
      key: "dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: <Link to={"user_list"}>用户列表</Link>,
      key: "user_list",
      icon: <TeamOutlined />,
    },
    {
      label: <Link to={"team_leader_list"}>团长列表</Link>,
      key: "team_leader_list",
      icon: <FlagOutlined />,
    },
    {
      label: <Link to={"banner_list"}>活动列表</Link>,
      key: "banner_list",
      icon: <GiftOutlined />,
    },
    {
      label: "商品管理",
      key: "goods",
      icon: <ShoppingOutlined />,
      children: [
        {
          label: <Link to={"goods/merchant_list"}>商家列表</Link>,
          key: "goods_merchant_list",
          icon: <ShopOutlined />,
        },
        {
          label: <Link to={"goods/category_list"}>商品分类</Link>,
          key: "goods_category_list",
          icon: <AppstoreOutlined />,
        },
        {
          label: <Link to={"goods/list"}>商品列表</Link>,
          key: "goods_list",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: <Link to={"order_list"}>订单列表</Link>,
      key: "order_list",
      icon: <SnippetsOutlined />,
    },
    {
      label: "权限管理",
      key: "auth",
      icon: <LockOutlined />,
      children: [
        {
          label: <Link to={"auth/role_list"}>岗位列表</Link>,
          key: "auth_role_list",
          icon: <MehOutlined />,
        },
        {
          label: <Link to={"auth/admin_list"}>团队列表</Link>,
          key: "auth_admin_list",
          icon: <TeamOutlined />,
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
