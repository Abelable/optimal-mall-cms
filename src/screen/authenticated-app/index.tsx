import { useState } from "react";
import { useRouteType } from "utils/url";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { useUserInfo } from "service/auth";
import { HashRouter as Router, Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

import { Avatar, Button, Dropdown, Layout, Menu, MenuProps } from "antd";
import { NavigationBar } from "components/navigation-bar";
import { Row } from "components/lib";

import {
  DashboardOutlined,
  LockOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretDownOutlined,
  MehOutlined,
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  CarOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  GiftOutlined,
  SnippetsOutlined,
  CloudOutlined,
  PictureOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  FlagOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import logo from "assets/images/logo.png";
import { CouponIcon } from "assets/icon";

import { Dashboard } from "./dashboard";
import { UserList } from "./user-list";
import { PromoterList } from "./team/promoter-list";
import { AuthInfoList } from "./team/auth-info-list";
import { LivestockList } from "./team/livestock-list";
import { GiftGoodsList } from "./team/gift-goods-list";
import { HomeBannerList } from "./activity-management/home-banner-list";
import { ActivityList } from "./activity-management/activity-list";
import { CouponList } from "./activity-management/coupon-list";
import { RuralBannerList } from "./rural/banner-list";
import { RuralRegionList } from "./rural/region-list";
import { RuralGoodsList } from "./rural/goods-list";
import { IntegrityBannerList } from "./integrity/banner-list";
import { IntegrityGoodsList } from "./integrity/goods-list";
import { MerchantList } from "./mall/merchant-list";
import { FreightTemplateList } from "./mall/freight-template-list";
import { CategoryList } from "./mall/category-list";
import { GoodsList } from "./mall/goods-list";
import { OrderList } from "./order-list";
import { RoleList } from "./auth/role-list";
import { AdminList } from "./auth/admin-list";

import type { UserInfo } from "types/auth";

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
              <Route path="team/promoter_list" element={<PromoterList />} />
              <Route path="team/auth_info_list" element={<AuthInfoList />} />
              <Route path="team/livestock_list" element={<LivestockList />} />
              <Route path="team/gift_goods_list" element={<GiftGoodsList />} />
              <Route
                path="activity/home_banner_list"
                element={<HomeBannerList />}
              />
              <Route path="activity/list" element={<ActivityList />} />
              <Route path="activity/coupon_list" element={<CouponList />} />
              <Route path="rural/banner_list" element={<RuralBannerList />} />
              <Route path="rural/region_list" element={<RuralRegionList />} />
              <Route path="rural/goods_list" element={<RuralGoodsList />} />
              <Route
                path="integrity/banner_list"
                element={<IntegrityBannerList />}
              />
              <Route
                path="integrity/goods_list"
                element={<IntegrityGoodsList />}
              />
              <Route path="goods/merchant_list" element={<MerchantList />} />
              <Route
                path="goods/freight_template_list"
                element={<FreightTemplateList />}
              />
              <Route path="goods/category_list" element={<CategoryList />} />
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
      icon: <UserOutlined />,
    },
    {
      label: "团队管理",
      key: "team",
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link to={"team/promoter_list"}>推广员列表</Link>,
          key: "team_promoter_list",
          icon: <UserOutlined />,
        },
        {
          label: <Link to={"team/auth_info_list"}>实名认证</Link>,
          key: "team_auth_info_list",
          icon: <VerifiedOutlined />,
        },
        {
          label: <Link to={"team/livestock_list"}>认养专区</Link>,
          key: "team_livestock_list",
          icon: <ShoppingOutlined />,
        },
        {
          label: <Link to={"team/gift_goods_list"}>礼包专区</Link>,
          key: "team_gift_goods_list",
          icon: <ShoppingOutlined />,
        },
      ],
    },
    {
      label: "活动管理",
      key: "activity",
      icon: <GiftOutlined />,
      children: [
        {
          label: <Link to={"activity/home_banner_list"}>首页头图</Link>,
          key: "activity_home_banner_list",
          icon: <PictureOutlined />,
        },
        {
          label: <Link to={"activity/list"}>商品活动</Link>,
          key: "activity_list",
          icon: <FlagOutlined />,
        },
        {
          label: <Link to={"activity/coupon_list"}>优惠券</Link>,
          key: "activity_coupon_list",
          icon: <CouponIcon />,
        },
      ],
    },
    {
      label: "诚信乡村",
      key: "rural",
      icon: <CloudOutlined />,
      children: [
        {
          label: <Link to={"rural/banner_list"}>头图列表</Link>,
          key: "rural_banner_list",
          icon: <PictureOutlined />,
        },
        {
          label: <Link to={"rural/region_list"}>地区列表</Link>,
          key: "rural_region_list",
          icon: <EnvironmentOutlined />,
        },
        {
          label: <Link to={"rural/goods_list"}>商品列表</Link>,
          key: "rural_goods_list",
          icon: <ShoppingOutlined />,
        },
      ],
    },
    {
      label: "诚信臻品",
      key: "integrity",
      icon: <SafetyCertificateOutlined />,
      children: [
        {
          label: <Link to={"integrity/banner_list"}>头图列表</Link>,
          key: "integrity_banner_list",
          icon: <PictureOutlined />,
        },
        {
          label: <Link to={"integrity/goods_list"}>商品列表</Link>,
          key: "integrity_goods_list",
          icon: <ShoppingOutlined />,
        },
      ],
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
          label: <Link to={"goods/freight_template_list"}>运费模板</Link>,
          key: "goods_freight_template_list",
          icon: <CarOutlined />,
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
          <div>诚信星球管理后台</div>
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
