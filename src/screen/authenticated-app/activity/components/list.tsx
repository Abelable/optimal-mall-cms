import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { useDeleteBanner, useDownBanner, useUpBanner } from "service/banner";
import { Banner } from "types/banner";
import { useBannerModal, useBannerListQueryKey } from "../util";
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";

interface ListProps extends TableProps<Banner>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  sceneOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useBannerModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>商城Banner列表</PageTitle>
        <Button onClick={() => open()} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
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
            title: "封面",
            dataIndex: "cover",
            render: (value) => <Image width={88} src={value} />,
            width: "14rem",
          },
          {
            title: "活动状态",
            dataIndex: "status",
            render: (value) =>
              value === 1 ? (
                <span style={{ color: "#87d068" }}>进行中</span>
              ) : (
                <span style={{ color: "#999" }}>已结束</span>
              ),
            width: "14rem",
          },
          {
            title: "活动跳转场景",
            dataIndex: "scene",
            render: (value) => (
              <>{sceneOptions.find((item) => item.value === value)?.text}</>
            ),
            width: "14rem",
          },
          {
            title: "活动链接/id",
            dataIndex: "param",
          },
          {
            title: "描述",
            dataIndex: "nickname",
          },
          {
            title: "更新时间",
            render: (value, banner) => (
              <span>
                {banner.updatedAt
                  ? dayjs(banner.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "创建时间",
            render: (value, banner) => (
              <span>
                {banner.createdAt
                  ? dayjs(banner.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, banner) {
              return <More id={banner.id} status={banner.status} />;
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
  const { startEdit } = useBannerModal();
  const { mutate: upBanner } = useUpBanner(useBannerListQueryKey());
  const { mutate: downBanner } = useDownBanner(useBannerListQueryKey());
  const { mutate: deleteBanner } = useDeleteBanner(useBannerListQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该banner吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteBanner(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div onClick={() => (status === 1 ? downBanner(id) : upBanner(id))}>
          {status === 1 ? "结束活动" : "恢复活动"}
        </div>
      ),
      key: "status",
    },
    {
      label: <div onClick={() => startEdit(id)}>编辑</div>,
      key: "edit",
    },
    {
      label: <div onClick={() => confirmDelete(id)}>删除</div>,
      key: "delete",
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
