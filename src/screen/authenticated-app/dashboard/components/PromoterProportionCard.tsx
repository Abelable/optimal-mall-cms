import styled from "@emotion/styled";
import { Card } from "antd";
import { Pie } from "@ant-design/plots";
import { PageTitle, Row } from "components/lib";

export const PromoterProportionCard = ({
  levelsCountList,
  loading,
}: {
  levelsCountList: { level: number; number: number }[];
  loading: boolean;
}) => {
  const config = {
    data: levelsCountList
      .sort((a, b) => b.level - a.level)
      .map((item) => ({
        name: ["推荐官", "C1", "C2", "C3"][item.level - 1],
        number: item.number,
      })),
    angleField: "number",
    colorField: "name",
    innerRadius: 0.5,
    labels: [{ text: "number", style: { fontSize: 12, fontWeight: "bold" } }],
    style: {
      stroke: "#fff",
      inset: 1,
      radius: 10,
    },
    scale: {
      color: {
        palette: "spectral",
        offset: (t: any) => t * 0.8 + 0.1,
      },
    },
  };

  return (
    <ChartCard
      title={
        <Row>
          <PageTitle>推荐官类别占比</PageTitle>
        </Row>
      }
      styles={{ body: { border: "none" } }}
      loading={loading}
    >
      <Pie height={380} {...config} />
    </ChartCard>
  );
};

const ChartCard = styled(Card)`
  margin-right: 2.4rem;
  flex: 2;
  border-radius: 0.8rem;
  &:last-child {
    margin-right: 0;
  }
  canvas {
    width: 100% !important;
  }
`;
