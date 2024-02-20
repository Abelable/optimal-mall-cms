import styled from "@emotion/styled";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap: { [key: string]: string } = {
  "/auth": "权限管理",
  "/auth/role_list": "角色列表",
  "/auth/admin_list": "管理员列表",
  "/user": "用户管理",
  "/user/list": "用户列表",
  "/user/auth_info_list": "实名认证",
  "/activity": "活动管理",
  "/activity/mall_banner": "商城banner",
  "/shopping": "电商模块",
  "/shopping/merchant_list": "商家列表",
  "/shopping/shop": "店铺管理",
  "/shopping/shop/category_list": "店铺分类",
  "/shopping/shop/list": "店铺列表",
  "/shopping/express_list": "快递列表",
  "/shopping/goods": "商品管理",
  "/shopping/goods/category_list": "商品分类",
  "/shopping/goods/list": "商品列表",
  "/scenic": "景区模块",
  "/scenic/spot": "景区管理",
  "/scenic/spot/category_list": "景区分类",
  "/scenic/spot/list": "景区列表",
  "/scenic/provider": "服务商管理",
  "/scenic/provider/list": "服务商列表",
  "/scenic/provider/shop_list": "店铺列表",
  "/scenic/provider/spot_apply": "景区申请",
  "/scenic/ticket": "门票管理",
  "/scenic/ticket/category_list": "门票分类",
  "/scenic/ticket/list": "门票列表",
  "/hotel": "酒店模块",
  "/hotel/store": "酒店管理",
  "/hotel/store/category_list": "酒店分类",
  "/hotel/store/list": "酒店列表",
  "/hotel/store/list/room_type_list": "房型列表",
  "/hotel/store/room_list": "房间列表",
  "/hotel/provider": "服务商管理",
  "/hotel/provider/list": "服务商列表",
  "/hotel/provider/shop_list": "店铺列表",
  "/hotel/provider/hotel_apply": "酒店申请",
  "/catering": "餐饮模块",
  "/catering/provider": "商家管理",
  "/catering/provider/list": "商家列表",
  "/catering/provider/restaurant_apply": "门店申请",
  "/catering/restaurant": "门店管理",
  "/catering/restaurant/category_list": "门店分类",
  "/catering/restaurant/list": "门店列表",
  "/catering/meal_ticket_list": "代金券列表",
  "/catering/set_meal_list": "套餐列表",
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
