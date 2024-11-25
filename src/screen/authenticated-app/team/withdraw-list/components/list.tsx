import styled from "@emotion/styled";
import {
  Avatar,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { UserOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import { useApprovedWithdraw, useDeleteWithdraw } from "service/withdraw";
import {
  useWithdrawModal,
  useWithdrawListQueryKey,
  useRejectModal,
  useShippingModal,
} from "../util";
import { SearchPanelProps } from "./search-panel";

import type { Withdraw } from "types/withdraw";

interface ListProps extends TableProps<Withdraw>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  statusOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>提现列表</PageTitle>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value) => (
              <div
                style={{ color: [0, 2].includes(value) ? "#faad14" : "#000" }}
              >
                {statusOptions.find((item) => item.value === value)?.text}
              </div>
            ),
            filters: statusOptions,
            onFilter: (value, withdraw) => withdraw.status === value,
          },
          {
            title: "场景",
            dataIndex: "scene",
            render: (value) => (
              <Tag color={["blue", "green", "orange"][value - 1]}>
                {["自购", "分享", "礼包"][value - 1]}
              </Tag>
            ),
          },
          {
            title: "提现用户",
            dataIndex: "userInfo",
            render: (value) => (
              <>
                <Avatar
                  size="small"
                  src={value.avatar}
                  icon={<UserOutlined />}
                />
                <span style={{ marginLeft: "0.6rem" }}>
                  {value.nickname.length > 8
                    ? `${value.nickname.slice(0, 8)}...`
                    : value.nickname}
                </span>
              </>
            ),
            width: "20rem",
          },
          {
            title: "提现金额",
            dataIndex: "withdrawAmount",
            render: (value) => <>¥{value}</>,
          },
          {
            title: "税费",
            dataIndex: "taxFee",
            render: (value) => <>¥{value}</>,
          },
          {
            title: "手续费",
            dataIndex: "handlingFee",
            render: (value) => <>¥{value}</>,
          },
          {
            title: "到账金额",
            dataIndex: "actualAmount",
            render: (value) => <div style={{ color: "red" }}>¥{value}</div>,
          },
          {
            title: "提现方式",
            dataIndex: "path",
            render: (value) => <>{value === 1 ? "微信" : "银行卡"}</>,
          },
          {
            title: "备注",
            dataIndex: "remark",
            width: "28rem",
          },
          {
            title: "提交时间",
            render: (value, withdraw) => (
              <span>
                {withdraw.createdAt
                  ? dayjs(withdraw.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "处理时间",
            render: (value, withdraw) => (
              <span>
                {withdraw.updatedAt
                  ? dayjs(withdraw.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, withdraw) {
              return <More withdraw={withdraw} />;
            },
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ withdraw }: { withdraw: Withdraw }) => {
  const { open: openWithdrawModal } = useWithdrawModal();
  const { open: openRejectModal } = useRejectModal();
  const { open: openShippingModal } = useShippingModal();
  const { mutate: approvedWithdraw } = useApprovedWithdraw(
    useWithdrawListQueryKey()
  );
  const { mutate: deleteWithdraw } = useDeleteWithdraw(
    useWithdrawListQueryKey()
  );

  const confirmApproved = () => {
    Modal.confirm({
      title: "请核实信息之后，再确定提现申请",
      content: `点击确定${withdraw.path === 1 ? "同意退款" : "同意退货"}`,
      okText: "确定",
      cancelText: "取消",
      onOk: () => approvedWithdraw(withdraw.id),
    });
  };

  const confirmReceived = () => {
    Modal.confirm({
      title: "确认收货之前，请核实物流信息",
      content: "点击确定确认收货并退款",
      okText: "确定",
      cancelText: "取消",
      onOk: () => approvedWithdraw(withdraw.id),
    });
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: "确定删除该提现申请吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteWithdraw(withdraw.id),
    });
  };

  let items: MenuProps["items"];
  switch (withdraw.status) {
    case 0:
      items = [
        {
          label: <div onClick={() => openWithdrawModal(withdraw.id)}>详情</div>,
          key: "detail",
        },
        {
          label: (
            <div onClick={() => confirmApproved()}>
              {withdraw.path === 1 ? "同意退款" : "同意退货"}
            </div>
          ),
          key: "approved",
        },
        {
          label: (
            <div onClick={() => openRejectModal(withdraw.id)}>
              {withdraw.path === 1 ? "拒绝退款" : "拒绝退货"}
            </div>
          ),
          key: "reject",
        },
      ];
      break;

    case 1:
      items = [
        {
          label: <div onClick={() => openWithdrawModal(withdraw.id)}>详情</div>,
          key: "detail",
        },
      ];
      break;

    case 2:
      items = [
        {
          label: <div onClick={() => openWithdrawModal(withdraw.id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => openShippingModal(withdraw.id)}>物流</div>,
          key: "express",
        },
        {
          label: <div onClick={() => confirmReceived()}>确认收货</div>,
          key: "received",
        },
      ];
      break;

    case 3:
      items = [
        {
          label: <div onClick={() => openWithdrawModal(withdraw.id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => confirmDelete()}>删除</div>,
          key: "delete",
        },
      ];
      break;
    case 4:
      items = [
        {
          label: <div onClick={() => openWithdrawModal(withdraw.id)}>详情</div>,
          key: "detail",
        },
      ];
      break;
  }

  return (
    <Dropdown overlay={<Menu items={items} />}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  margin-top: 2.4rem;
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;