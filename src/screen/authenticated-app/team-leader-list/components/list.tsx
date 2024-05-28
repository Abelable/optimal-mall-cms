import styled from "@emotion/styled";
import {
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
  Tag,
  Popover,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { TeamLeader } from "types/teamLeader";
import {
  useTeamLeaderModal,
  useTeamLeadersQueryKey,
  useRejectModal,
} from "../util";
import { SearchPanelProps } from "./search-panel";
import { useApprovedTeamLeader } from "service/teamLeader";

interface ListProps extends TableProps<TeamLeader>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  statusOptions,
  typeOptions,
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
        <PageTitle>商家列表</PageTitle>
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
            title: "商家类型",
            dataIndex: "type",
            render: (value) => <>{value === 1 ? "个人" : "企业"}</>,
            filters: typeOptions,
            onFilter: (value, teamLeader) => teamLeader.type === value,
          },
          {
            title: "联系人姓名",
            dataIndex: "name",
          },
          {
            title: "联系人手机号",
            dataIndex: "mobile",
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value, teamLeader) =>
              value === 0 ? (
                <span style={{ color: "#faad14" }}>待审核</span>
              ) : value === 1 ? (
                <span style={{ color: "#1890ff" }}>待支付保证金</span>
              ) : value === 2 ? (
                <Popover
                  title="保证金支付信息"
                  content={
                    <div>
                      <p>支付金额：{teamLeader.depositInfo.paymentAmount}元</p>
                      <p>
                        支付状态：
                        {teamLeader.depositInfo.status === 1 ? (
                          <Tag color="success">已支付</Tag>
                        ) : (
                          <Tag color="error">未支付</Tag>
                        )}
                      </p>
                      <p>支付Id：{teamLeader.depositInfo.payId}</p>
                      <p>支付编号：{teamLeader.depositInfo.orderSn}</p>
                      <p>
                        支付时间：
                        {dayjs(teamLeader.depositInfo.updatedAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </p>
                    </div>
                  }
                >
                  <span style={{ color: "#52c41a", cursor: "pointer" }}>
                    入驻成功
                  </span>
                </Popover>
              ) : (
                <Tooltip title={teamLeader.failureReason}>
                  <span style={{ color: "#ff4d4f", cursor: "pointer" }}>
                    已驳回
                  </span>
                </Tooltip>
              ),
            filters: statusOptions,
            onFilter: (value, teamLeader) => teamLeader.status === value,
          },
          {
            title: "入驻时间",
            render: (value, teamLeader) => (
              <span>
                {teamLeader.createdAt
                  ? dayjs(teamLeader.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, teamLeader) => (
              <span>
                {teamLeader.updatedAt
                  ? dayjs(teamLeader.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, teamLeader) {
              return <More id={teamLeader.id} status={teamLeader.status} />;
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

const More = ({ id, status }: { id: number; status: number }) => {
  const { open } = useTeamLeaderModal();
  const { mutate: approvedTeamLeader } = useApprovedTeamLeader(
    useTeamLeadersQueryKey()
  );
  const { open: openRejectModal } = useRejectModal();

  const confirmApproved = (id: number) => {
    Modal.confirm({
      title: "商家审核通过确认",
      content: "请确保在商家信息无误的情况下进行该操作",
      okText: "确定",
      cancelText: "取消",
      onOk: () => approvedTeamLeader(id),
    });
  };

  const items: MenuProps["items"] =
    status === 0
      ? [
          {
            label: <div onClick={() => open(id)}>详情</div>,
            key: "detail",
          },
          {
            label: <div onClick={() => confirmApproved(id)}>通过</div>,
            key: "approved",
          },
          {
            label: <div onClick={() => openRejectModal(id)}>驳回</div>,
            key: "reject",
          },
        ]
      : [
          {
            label: <div onClick={() => open(id)}>详情</div>,
            key: "detail",
          },
        ];

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
