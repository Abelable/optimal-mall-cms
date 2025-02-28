import { Column } from "@ant-design/charts";
import { Card, Tabs } from "antd";

export const CommissionCard = ({
  salesData,
  annotations,
  loading,
}: {
  salesData: { x: string; y: number; type: string }[];
  annotations: any[];
  loading: boolean;
}) => (
  <Card
    loading={loading}
    bordered={false}
    bodyStyle={{
      padding: 0,
    }}
    style={{ flex: 2 }}
  >
    <Tabs
      size="large"
      tabBarStyle={{
        marginBottom: 24,
      }}
      items={[
        {
          key: "sales",
          label: "销售额",
          children: (
            <Column
              height={300}
              data={salesData}
              xField="x"
              yField="y"
              colorField="type"
              label={{
                text: "y",
                textBaseline: "bottom",
                position: "inside",
              }}
              stack
              annotations={annotations}
              paddingBottom={12}
              axis={{
                x: {
                  title: false,
                },
                y: {
                  title: false,
                  gridLineDash: null,
                  gridStroke: "#ccc",
                },
              }}
              scale={{
                x: { paddingInner: 0.4 },
              }}
              tooltip={{
                name: "销售量",
                channel: "y",
              }}
            />
          ),
        },
        {
          key: "views",
          label: "访问量",
          children: (
            <Column
              height={300}
              data={salesData}
              xField="x"
              yField="y"
              colorField="type"
              label={{
                text: "y",
                textBaseline: "bottom",
                position: "inside",
              }}
              stack
              annotations={annotations}
              paddingBottom={12}
              axis={{
                x: {
                  title: false,
                },
                y: {
                  title: false,
                  gridLineDash: null,
                  gridStroke: "#ccc",
                },
              }}
              scale={{
                x: { paddingInner: 0.4 },
              }}
              tooltip={{
                name: "销售量",
                channel: "y",
              }}
            />
          ),
        },
      ]}
    />
  </Card>
);
