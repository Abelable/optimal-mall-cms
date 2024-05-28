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
