import { Form, Input, Modal, Tree } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";

import { Key, useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { useAddRole, useEditRole } from "service/role";
import { useRoleModal, useRolesQueryKey } from "../util";

import type { DataNode, TreeProps } from "antd/es/tree";

const treeData: DataNode[] = [
  {
    title: "首页",
    key: "home",
  },
  {
    title: "我的供应商",
    key: "suppliers",
  },
  {
    title: "我的代理商",
    key: "agents",
  },
  {
    title: "产品管理中心",
    key: "product",
    children: [
      {
        title: "产品渠道管理",
        key: "product/channels",
      },
      {
        title: "在售商品管理",
        key: "product/sales",
      },
    ],
  },
  {
    title: "订单中心",
    key: "order",
    children: [
      {
        title: "订单处理",
        key: "order/handle",
      },
      {
        title: "订单处理 > 导出信息脱敏并加密码",
        key: "order/encryption",
      },
      {
        title: "转单配置",
        key: "order/convert",
      },
      {
        title: "抓单管理",
        key: "order/grab",
      },
      {
        title: "回调记录",
        key: "order/log",
      },
    ],
  },
  {
    title: "生产管理中心",
    key: "produce",
    children: [
      {
        title: "生产发货",
        key: "produce/deliver",
      },
      {
        title: "自动生产配置",
        key: "produce/configure",
      },
      {
        title: "批量导入",
        key: "produce/import",
      },
    ],
  },
  {
    title: "系统管理",
    key: "system",
    children: [
      {
        title: "黑名单配置",
        key: "system/blacklist",
      },
      {
        title: "地址库映射",
        key: "system/address_list",
      },
      {
        title: "下游地址库映射",
        key: "system/shop_address_list",
      },
    ],
  },
  {
    title: "账户管理",
    key: "account",
    children: [
      {
        title: "我的团队",
        key: "account/member",
      },
      {
        title: "岗位管理",
        key: "account/role",
      },
    ],
  },
];

export const RoleModal = () => {
  const [form] = useForm();
  const { roleModalOpen, editingRoleId, editingRole, isLoading, close } =
    useRoleModal();

  const useMutateRole = editingRoleId ? useEditRole : useAddRole;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useRolesQueryKey());

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);

  const onSelect: TreeProps["onSelect"] = (selectedKeys) => {
    setSelectedKeys(selectedKeys as Key[]);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys) => {
    setCheckedKeys(checkedKeys as Key[]);
  };

  const onExpand: TreeProps["onExpand"] = (expandedKeys) => {
    setExpandedKeys(expandedKeys as Key[]);
  };

  useEffect(() => {
    form.setFieldsValue(editingRole);
  }, [editingRole, form]);

  const confirm = () => {
    console.log("form.getFieldsValue()", form.getFieldsValue());
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingRole, ...form.getFieldsValue() });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      forceRender={true}
      title={editingRoleId ? "编辑角色" : "新增角色"}
      open={roleModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            label={"角色名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input placeholder={"请输入角色名称"} />
          </Form.Item>
          <Form.Item
            label={"角色描述"}
            name={"desc"}
            rules={[{ required: true, message: "请输入角色描述" }]}
          >
            <Input placeholder={"请输入角色描述"} />
          </Form.Item>

          <Form.Item
            label={"角色权限"}
            name={"desc"}
            rules={[{ required: true, message: "请选择角色权限" }]}
          >
            <Tree
              checkable
              selectedKeys={selectedKeys}
              checkedKeys={checkedKeys}
              expandedKeys={expandedKeys}
              onSelect={onSelect}
              onCheck={onCheck}
              onExpand={onExpand}
              treeData={treeData}
            />
          </Form.Item>

          {/* <Tree
            checkable
            selectedKeys={selectedKeys}
            checkedKeys={checkedKeys}
            expandedKeys={expandedKeys}
            onSelect={onSelect}
            onCheck={onCheck}
            onExpand={onExpand}
            treeData={treeData}
          /> */}
        </Form>
      )}
    </Modal>
  );
};
