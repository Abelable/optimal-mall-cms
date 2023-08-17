import dayjs from "dayjs";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useHotelModal, useHotelListQueryKey, useRejectModal } from "../util";

import {
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
  Button,
  Image,
  Tag,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { useApprovedHotel, useDeleteHotel } from "service/hotel";
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";

import type { Hotel } from "types/hotel";

interface ListProps extends TableProps<Hotel>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  gradeOptions,
  categoryOptions,
  statusOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useHotelModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>酒店列表</PageTitle>
        <Button onClick={() => open()} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 1500 }}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
            fixed: "left",
          },
          {
            title: "图片",
            dataIndex: "cover",
            render: (value) => <Image width={68} src={value} />,
            width: "14rem",
          },
          {
            title: "名称",
            dataIndex: "name",
          },
          {
            title: "档次",
            dataIndex: "grade",
            width: "14rem",
            render: (value) => (
              <>{gradeOptions.find((item) => item.value === value)?.text}</>
            ),
          },
          {
            title: "分类",
            dataIndex: "categoryId",
            width: "14rem",
            render: (value) => (
              <>{categoryOptions.find((item) => item.id === value)?.name}</>
            ),
          },
          {
            title: "价格",
            dataIndex: "price",
            width: "14rem",
            render: (value) => <>{`¥${value}起`}</>,
          },
          {
            title: "评分",
            dataIndex: "rate",
            width: "12rem",
          },
          {
            title: "状态",
            dataIndex: "status",
            width: "12rem",
            render: (value, hotel) =>
              value === 0 ? (
                <Tag color="green">待审核</Tag>
              ) : value === 1 ? (
                <Tag color="blue">营业中</Tag>
              ) : (
                <Tooltip title={hotel.failureReason}>
                  <Tag color="red">未过审</Tag>
                </Tooltip>
              ),
            filters: statusOptions,
            onFilter: (value, hotel) => hotel.status === value,
          },
          {
            title: "创建时间",
            render: (value, hotel) => (
              <span>
                {hotel.createdAt
                  ? dayjs(hotel.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, hotel) => (
              <span>
                {hotel.updatedAt
                  ? dayjs(hotel.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, hotel) {
              return (
                <More id={hotel.id} status={hotel.status} name={hotel.name} />
              );
            },
            width: "8rem",
            fixed: "right",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({
  id,
  status,
  name,
}: {
  id: number;
  status: number;
  name: string;
}) => {
  const navigate = useNavigate();
  const link = (id: string, name: string) =>
    navigate(`/hotel/list/room_type_list?hotelId=${id}&hotelName=${name}`);

  const { startEdit } = useHotelModal();
  const { mutate: deleteHotel } = useDeleteHotel(useHotelListQueryKey());
  const { mutate: approvedHotel } = useApprovedHotel(useHotelListQueryKey());
  const { open: openRejectModal } = useRejectModal();

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该酒店吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteHotel(id),
    });
  };

  const confirmApproved = (id: number) => {
    Modal.confirm({
      title: "酒店审核通过确认",
      content: "请确保在酒店信息无误的情况下进行该操作",
      okText: "确定",
      cancelText: "取消",
      onOk: () => approvedHotel(id),
    });
  };

  let items: MenuProps["items"];
  switch (status) {
    case 0:
      items = [
        {
          label: <div onClick={() => startEdit(id)}>编辑</div>,
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

        {
          label: <div onClick={() => confirmDelete(id)}>删除</div>,
          key: "delete",
        },
      ];
      break;

    case 1:
      items = [
        {
          label: <div onClick={() => startEdit(id)}>编辑</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => openRejectModal(id)}>驳回重审</div>,
          key: "reject",
        },
        {
          label: <div onClick={() => confirmDelete(id)}>删除</div>,
          key: "delete",
        },
        {
          label: <div onClick={() => link(`${id}`, name)}>查看房型</div>,
          key: "room_type",
        },
      ];
      break;

    case 2:
      items = [
        {
          label: <div onClick={() => startEdit(id)}>编辑</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => confirmDelete(id)}>删除</div>,
          key: "delete",
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
