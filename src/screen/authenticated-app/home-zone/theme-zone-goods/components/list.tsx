import {
  Button,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
  InputNumber,
} from "antd";
import { ErrorBox, Row, PageTitle } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeleteGoods, useEditSort } from "service/themeZoneGoods";
import { useGoodsModal, useGoodsListQueryKey } from "../util";

import type { SearchPanelProps } from "./search-panel";
import type { Goods, GoodsListSearchParams } from "types/themeZoneGoods";

interface ListProps extends TableProps<Goods>, SearchPanelProps {
  params: Partial<GoodsListSearchParams>;
  setParams: (params: Partial<GoodsListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({
  themeZoneOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useGoodsModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editSort } = useEditSort(useGoodsListQueryKey());
  const { mutate: deleteGoods } = useDeleteGoods(useGoodsListQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该商品吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteGoods(id),
    });
  };

  return (
    <Container>
      <Header between={true}>
        <PageTitle>主题商品</PageTitle>
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
            title: "主题名称",
            dataIndex: "themeId",
            render: (value) => (
              <>{themeZoneOptions.find((item) => item.id === value)?.name}</>
            ),
            width: "10rem",
          },
          {
            title: "商品id",
            dataIndex: "goodsId",
            width: "8rem",
          },
          {
            title: "商品封面",
            dataIndex: "goodsCover",
            render: (value) => <Image width={68} src={value} />,
          },
          {
            title: "商品名称",
            dataIndex: "goodsName",
          },
          {
            title: "排序",
            dataIndex: "sort",
            render: (value, category) => (
              <InputNumber
                value={value}
                onChange={(sort) => editSort({ id: category.id, sort })}
              />
            ),
            sorter: (a, b) => a.sort - b.sort,
          },
          {
            title: "创建时间",
            render: (value, goods) => (
              <span>
                {goods.createdAt
                  ? dayjs(goods.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
            width: "18rem",
          },
          {
            title: "操作",
            render(value, goods) {
              return (
                <Button
                  onClick={() => confirmDelete(goods.id)}
                  type="link"
                  danger
                >
                  删除
                </Button>
              );
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

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
