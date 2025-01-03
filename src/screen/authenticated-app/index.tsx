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
  FlagOutlined,
  VerifiedOutlined,
  HeartOutlined,
  TransactionOutlined,
  PayCircleOutlined,
  FireOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import logo from "assets/images/logo.png";
import { CouponIcon, ExpressIcon } from "assets/icon";

import { Dashboard } from "./dashboard";
import { UserList } from "./user-list";
import { PromoterList } from "./team/promoter-list";
import { AuthInfoList } from "./team/auth-info-list";
import { EnterpriseInfoList } from "./team/enterprise-info-list";
import { WithdrawList } from "./team/withdraw-list";
import { LivestockList } from "./team/livestock-list";
import { GiftGoodsList } from "./team/gift-goods-list";
import { HomeBannerList } from "./activity-management/home-banner-list";
import { ActivityList } from "./activity-management/activity-list";
import { CouponList } from "./activity-management/coupon-list";
import { NewYearGoodsList } from "./activity-management/new-year/goods-list";
import { NewYearCultureGoodsList } from "./activity-management/new-year/culture-goods-list";
import { NewYearLocalRegionList } from "./activity-management/new-year/local-region-list";
import { NewYearLocalGoodsList } from "./activity-management/new-year/local-goods-list";
import { LimitedTimeRecruitCategoryList } from "./activity-management/limited-time-recruit/category-list";
import { LimitedTimeRecruitGoodsList } from "./activity-management/limited-time-recruit/goods-list";
import { RuralBannerList } from "./rural/banner-list";
import { RuralRegionList } from "./rural/region-list";
import { RuralGoodsList } from "./rural/goods-list";
import { VillageGrainGoodsList } from "./home-zone/grain-goods";
import { VillageFreshGoodsList } from "./home-zone/fresh-goods";
import { VillageSnackGoodsList } from "./home-zone/snack-goods";
import { VillageGiftGoodsList } from "./home-zone/gift-goods";
import { IntegrityGoodsList } from "./home-zone/integrity-goods";
import { MerchantList } from "./mall/merchant-list";
import { FreightTemplateList } from "./mall/freight-template-list";
import { CategoryList } from "./mall/category-list";
import { GoodsList } from "./mall/goods-list";
import { ExpressList } from "./order-management/express-list";
import { OrderList } from "./order-management/order-list";
import { RefundList } from "./order-management/refund-list";
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
              <Route
                path="team/enterprise_info_list"
                element={<EnterpriseInfoList />}
              />
              <Route path="team/withdraw_list" element={<WithdrawList />} />
              <Route path="team/livestock_list" element={<LivestockList />} />
              <Route path="team/gift_goods_list" element={<GiftGoodsList />} />
              <Route
                path="activity/home_banner_list"
                element={<HomeBannerList />}
              />
              <Route path="activity/list" element={<ActivityList />} />
              <Route path="activity/coupon_list" element={<CouponList />} />
              <Route
                path="activity/new_year/goods_list"
                element={<NewYearGoodsList />}
              />
              <Route
                path="activity/new_year/culture_goods_list"
                element={<NewYearCultureGoodsList />}
              />
              <Route
                path="activity/new_year/region_list"
                element={<NewYearLocalRegionList />}
              />
              <Route
                path="activity/new_year/local_goods_list"
                element={<NewYearLocalGoodsList />}
              />
              <Route
                path="activity/limited_time_recruit/category_list"
                element={<LimitedTimeRecruitCategoryList />}
              />
              <Route
                path="activity/limited_time_recruit/goods_list"
                element={<LimitedTimeRecruitGoodsList />}
              />
              <Route path="rural/banner_list" element={<RuralBannerList />} />
              <Route path="rural/region_list" element={<RuralRegionList />} />
              <Route path="rural/goods_list" element={<RuralGoodsList />} />
              <Route
                path="home_zone/grain_goods"
                element={<VillageGrainGoodsList />}
              />
              <Route
                path="home_zone/fresh_goods"
                element={<VillageFreshGoodsList />}
              />
              <Route
                path="home_zone/snack_goods"
                element={<VillageSnackGoodsList />}
              />
              <Route
                path="home_zone/gift_goods"
                element={<VillageGiftGoodsList />}
              />
              <Route
                path="home_zone/integrity_goods"
                element={<IntegrityGoodsList />}
              />
              <Route path="goods/merchant_list" element={<MerchantList />} />
              <Route
                path="goods/freight_template_list"
                element={<FreightTemplateList />}
              />
              <Route path="goods/category_list" element={<CategoryList />} />
              <Route path="goods/list" element={<GoodsList />} />
              <Route path="order/express_list" element={<ExpressList />} />
              <Route path="order/list" element={<OrderList />} />
              <Route path="order/refund" element={<RefundList />} />
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
      label: "首页专区",
      key: "home_zone",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link to={"home_zone/grain_goods"}>乡镇百谷</Link>,
          key: "home_zone_grain_goods",
          icon: <ShoppingOutlined />,
        },
        {
          label: <Link to={"home_zone/fresh_goods"}>乡集生鲜</Link>,
          key: "home_zone_fresh_goods",
          icon: <ShoppingOutlined />,
        },
        {
          label: <Link to={"home_zone/snack_goods"}>乡村零嘴</Link>,
          key: "home_zone_snack_goods",
          icon: <ShoppingOutlined />,
        },
        {
          label: <Link to={"home_zone/gift_goods"}>乡思礼伴</Link>,
          key: "home_zone_gift_goods",
          icon: <ShoppingOutlined />,
        },
        {
          label: <Link to={"home_zone/integrity_goods"}>诚信臻品</Link>,
          key: "home_zone_integrity_goods",
          icon: <ShoppingOutlined />,
        },
      ],
    },
    {
      label: "乡村振兴",
      key: "team",
      icon: <HeartOutlined />,
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
          label: <Link to={"team/enterprise_info_list"}>企业认证</Link>,
          key: "team_enterprise_info_list",
          icon: <VerifiedOutlined />,
        },
        {
          label: <Link to={"team/withdraw_list"}>佣金提现</Link>,
          key: "team_withdraw_list",
          icon: <PayCircleOutlined />,
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
        {
          label: "年货节",
          key: "activity_new_year",
          icon: <FireOutlined />,
          children: [
            {
              label: <Link to={"activity/new_year/goods_list"}>年货礼包</Link>,
              key: "activity_new_year_goods_list",
              icon: <ShoppingOutlined />,
            },
            {
              label: (
                <Link to={"activity/new_year/culture_goods_list"}>
                  文创礼包
                </Link>
              ),
              key: "activity_new_year_culture_goods_list",
              icon: <ShoppingOutlined />,
            },
            {
              label: <Link to={"activity/new_year/region_list"}>地区列表</Link>,
              key: "activity_new_year_region_list",
              icon: <EnvironmentOutlined />,
            },
            {
              label: (
                <Link to={"activity/new_year/local_goods_list"}>地方特产</Link>
              ),
              key: "activity_new_year_local_goods_list",
              icon: <ShoppingOutlined />,
            },
          ],
        },
        {
          label: "限时招募",
          key: "activity_limited_time_recruit",
          icon: <NotificationOutlined />,
          children: [
            {
              label: (
                <Link to={"activity/limited_time_recruit/category_list"}>
                  商品分类
                </Link>
              ),
              key: "activity_limited_time_recruit_category_list",
              icon: <AppstoreOutlined />,
            },
            {
              label: (
                <Link to={"activity/limited_time_recruit/local_goods_list"}>
                  商品列表
                </Link>
              ),
              key: "activity_limited_time_recruit_goods_list",
              icon: <ShoppingOutlined />,
            },
          ],
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
      label: "订单管理",
      key: "order",
      icon: <SnippetsOutlined />,
      children: [
        {
          label: <Link to={"order/express_list"}>快递列表</Link>,
          key: "order_express_list",
          icon: <ExpressIcon />,
        },
        {
          label: <Link to={"order/list"}>订单列表</Link>,
          key: "order_list",
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to={"order/refund"}>售后处理</Link>,
          key: "order_refund",
          icon: <TransactionOutlined />,
        },
      ],
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
