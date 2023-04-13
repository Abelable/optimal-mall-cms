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
import { UserList } from "./user-list";
import { MerchantList } from "./merchant/merchant-list/index";
import { MerchantOrderList } from "./merchant/merchant-order-list/index";
import { ShopCategoryList } from "./shop/category-list/index";
import { ShopList } from "./shop/shop-list";
import { ExpressList } from "./goods/express-list";
import { GoodsCategoryList } from "./goods/category-list";
import { GoodsList } from "./goods/goods-list";
import { ScenicCategoryList } from "./scenic-spot/category-list";
import { ScenicTicketCategoryList } from "./scenic-ticket/category-list";
import { ScenicList } from "./scenic-spot/scenic-list";

import {
  LockOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretDownOutlined,
  MehOutlined,
  TeamOutlined,
  ShopOutlined,
  AppstoreOutlined,
  FileDoneOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { ExpressIcon, ScenicSpotIcon, TicketIcon } from "assets/icon";
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
              <Route path="user_list" element={<UserList />} />
              <Route path="shop/merchant_list" element={<MerchantList />} />
              <Route
                path="shop/merchant_order_list"
                element={<MerchantOrderList />}
              />
              <Route path="shop/category_list" element={<ShopCategoryList />} />
              <Route path="shop/list" element={<ShopList />} />
              <Route path="goods/express_list" element={<ExpressList />} />
              <Route
                path="goods/category_list"
                element={<GoodsCategoryList />}
              />
              <Route path="goods/list" element={<GoodsList />} />
              <Route
                path="scenic_spot/category_list"
                element={<ScenicCategoryList />}
              />
              <Route path="scenic_spot/list" element={<ScenicList />} />
              <Route
                path="scenic_ticket/category_list"
                element={<ScenicTicketCategoryList />}
              />
              <Route
                path={"*"}
                element={<Navigate to={"user_list"} replace={true} />}
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
      label: <Link to={"user_list"}>用户列表</Link>,
      key: "user_list",
      icon: <TeamOutlined />,
    },
    {
      label: "权限管理",
      key: "auth",
      icon: <LockOutlined />,
      children: [
        {
          label: <Link to={"auth/role_list"}>角色列表</Link>,
          key: "role_list",
          icon: <MehOutlined />,
        },
        {
          label: <Link to={"auth/admin_list"}>管理员列表</Link>,
          key: "admin_list",
          icon: <TeamOutlined />,
        },
      ],
    },
    {
      label: "店铺管理",
      key: "shop",
      icon: <ShopOutlined />,
      children: [
        {
          label: <Link to={"shop/merchant_list"}>商家列表</Link>,
          key: "shop_merchant_list",
          icon: <TeamOutlined />,
        },
        {
          label: <Link to={"shop/merchant_order_list"}>商家入驻订单</Link>,
          key: "shop_merchant_order_list",
          icon: <FileDoneOutlined />,
        },
        {
          label: <Link to={"shop/category_list"}>店铺分类</Link>,
          key: "shop_category_list",
          icon: <AppstoreOutlined />,
        },
        {
          label: <Link to={"shop/list"}>店铺列表</Link>,
          key: "shop_list",
          icon: <ShopOutlined />,
        },
      ],
    },
    {
      label: "商品管理",
      key: "goods",
      icon: <ShoppingOutlined />,
      children: [
        {
          label: <Link to={"goods/express_list"}>快递列表</Link>,
          key: "goods_express_list",
          icon: <ExpressIcon />,
        },
        {
          label: <Link to={"goods/category_list"}>商品分类</Link>,
          key: "goods_category_list",
          icon: <AppstoreOutlined />,
        },
        {
          label: <Link to={"goods/list"}>商品列表</Link>,
          key: "goods_list",
          icon: <ShoppingOutlined />,
        },
      ],
    },
    {
      label: "景点管理",
      key: "scenic_spot",
      icon: <ScenicSpotIcon />,
      children: [
        {
          label: <Link to={"scenic_spot/category_list"}>景点分类</Link>,
          key: "scenic_category_list",
          icon: <AppstoreOutlined />,
        },
        {
          label: <Link to={"scenic_spot/list"}>景点列表</Link>,
          key: "scenic_spot_list",
          icon: <ScenicSpotIcon />,
        },
      ],
    },
    {
      label: "门票管理",
      key: "scenic_ticket",
      icon: <TicketIcon />,
      children: [
        {
          label: <Link to={"scenic_ticket/category_list"}>门票分类</Link>,
          key: "scenic_ticket_category_list",
          icon: <AppstoreOutlined />,
        },
      ],
    },
  ];

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <Link to={"/"}>
        <Logo collapsed={collapsed}>
          <LogoImg src={logo} />
          <div>小鱼游管理后台</div>
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
