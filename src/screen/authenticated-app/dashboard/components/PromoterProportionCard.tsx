import styled from "@emotion/styled";
import { Card } from "antd";
import { Pie } from "@ant-design/plots";

export const PromoterProportionCard = ({ loading }: { loading: boolean }) => {
  const config = {
    data: [
      { name: "推广员", number: 100 },
      { name: "C1", number: 80 },
      { name: "C2", number: 60 },
      { name: "C3", number: 10 },
    ],
    angleField: "number",
    colorField: "name",
    legend: false,
    innerRadius: 0.5,
    labels: [{ text: "name", style: { fontSize: 12, fontWeight: "bold" } }],
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
      title="推广员类别占比"
      bodyStyle={{ border: "none" }}
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
