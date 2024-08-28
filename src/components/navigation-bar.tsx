import styled from "@emotion/styled";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap: { [key: string]: string } = {
  "/dashboard": "数据概况",
  "/user_list": "用户列表",
  "/team": "团队管理",
  "/team/promoter_list": "推广员列表",
  "/team/livestock_list": "认养专区",
  "/team/gift_goods_list": "礼包专区",
  "/activity": "活动管理",
  "/activity/home_banner_list": "首页头图",
  "/activity/today_goods_list": "今日主推",
  "/activity/advance_goods_list": "活动预告",
  "/activity/list": "商品活动",
  "/rural": "诚信乡村",
  "/rural/banner_list": "头图列表",
  "/rural/region_list": "地区列表",
  "/rural/goods_list": "商品列表",
  "/integrity": "诚信臻品",
  "/integrity/banner_list": "头图列表",
  "/integrity/goods_list": "商品列表",
  "/goods": "商品管理",
  "/goods/merchant_list": "商家列表",
  "/goods/freight_template_list": "运费模板",
  "/goods/category_list": "商品分类",
  "/goods/list": "商品列表",
  "/order_list": "订单列表",
  "/auth": "权限管理",
  "/auth/role_list": "岗位列表",
  "/auth/admin_list": "团队列表",
};

export const NavigationBar = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  return (
    <Wrap>
      <div>当前位置：</div>
      <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.4rem;
`;
