import { Form, Image, Modal, Select } from "antd";
import { ErrorBox } from "components/lib";

import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import _ from "lodash";
import { useGoodsOptions } from "service/goods";
import { useAddRuralGoods } from "service/ruralGoods";
import { useRuralGoodsModal, useRuralGoodsListQueryKey } from "../util";

import type { RuralRegionOption } from "types/ruralRegion";
import styled from "@emotion/styled";
import { GoodsOption } from "types/goods";

export const RuralGoodsModal = ({
  regionOptions,
}: {
  regionOptions: RuralRegionOption[];
}) => {
  const [form] = useForm();
  const { ruralGoodsModalOpen, close } = useRuralGoodsModal();

  const [keywords, setKeywords] = useState("");
  const [options, setOptions] = useState<GoodsOption[]>([]);
  const { data: goodsOptions = [], error: goodsOptionsError } = useGoodsOptions(
    { keywords }
  );

  useEffect(() => {
    if (goodsOptions.length) {
      setOptions(goodsOptions);
    }
  }, [goodsOptions]);

  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useAddRuralGoods(useRuralGoodsListQueryKey());

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync(form.getFieldsValue());
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
      title="新增商品"
      open={ruralGoodsModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error || goodsOptionsError} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="regionId"
          label="地区"
          rules={[{ required: true, message: "请选择地区" }]}
        >
          <Select placeholder="请选择地区">
            {regionOptions.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="goodsIds"
          label="商品"
          rules={[{ required: true, message: "请选择商品" }]}
        >
          <Select
            onSearch={_.debounce((value) => {
              setKeywords(value);
              setOptions(goodsOptions);
            }, 500)}
            mode="multiple"
            showSearch
            placeholder="请选择商品"
          >
            {options.map(({ id, cover, name }) => (
              <Select.Option key={id} value={id}>
                <GoodsCover src={cover} />
                <span>{name}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const GoodsCover = styled(Image)`
  margin-right: 0.6rem;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 0.4rem;
`;
