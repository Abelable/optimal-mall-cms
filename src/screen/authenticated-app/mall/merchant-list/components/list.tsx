import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Image,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { useDeleteMerchant } from "service/merchant";
import { Merchant, MerchantListSearchParams } from "types/merchant";
import { useMerchantModal, useMerchantListQueryKey } from "../util";
import { PlusOutlined } from "@ant-design/icons";

interface ListProps extends TableProps<Merchant> {
  params: Partial<MerchantListSearchParams>;
  setParams: (params: Partial<MerchantListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useMerchantModal();

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
            title: "商家名称",
            dataIndex: "name",
            width: "30rem",
          },
          {
            title: "收件人姓名",
            dataIndex: "consigneeName",
            width: "14rem",
          },
          {
            title: "收件人手机号",
            dataIndex: "mobile",
            width: "14rem",
          },
          {
            title: "退货地址",
            dataIndex: "addressDetail",
            width: "30rem",
          },
          {
            title: "经营资质",
            dataIndex: "license",
            render: (value) => (
              <>
                {value.length
                  ? value.map((img: string, index: number) => (
                      <Image key={index} width={68} src={img} />
                    ))
                  : "暂无经营资质"}
              </>
            ),
            width: "20rem",
          },
          {
            title: "补充说明",
            dataIndex: "supplement",
          },
          {
            title: "操作",
            render(value, merchant) {
              return <More id={merchant.id} />;
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

const More = ({ id }: { id: number }) => {
  const { startEdit } = useMerchantModal();
  const { mutate: deleteMerchant } = useDeleteMerchant(
    useMerchantListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该商家吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteMerchant(id),
    });
  };

  const items: MenuProps["items"] = [
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
    <Dropdown menu={{ items }}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
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
