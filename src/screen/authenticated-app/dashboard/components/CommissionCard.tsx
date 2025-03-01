import { Column } from "@ant-design/charts";
import { Card, Tabs } from "antd";
import useStyles from "../style.style";

export const CommissionCard = ({
  salesData,
  annotations,
  loading,
}: {
  salesData: { x: string; y: number; type: string }[];
  annotations: any[];
  loading: boolean;
}) => {
  const { styles } = useStyles();
  return (
    <Card
      loading={loading}
      variant="borderless"
      styles={{
        body: { padding: 0 },
      }}
      style={{ flex: 2 }}
    >
      <div className={styles.salesCard}>
        <Tabs
          size="large"
          tabBarStyle={{
            marginBottom: 24,
          }}
          items={[
            {
              key: "share_goods_commission",
              label: "分享佣金",
              children: (
                <div style={{ padding: "32px", paddingTop: 0 }}>
                  <Column
                    height={350}
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
                </div>
              ),
            },
            {
              key: "self_goods_commission",
              label: "自购佣金",
              children: (
                <div style={{ padding: "32px", paddingTop: 0 }}>
                  <Column
                    height={350}
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
                </div>
              ),
            },
            {
              key: "gift_commission",
              label: "礼包佣金",
              children: (
                <div style={{ padding: "32px", paddingTop: 0 }}>
                  <Column
                    height={350}
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
                </div>
              ),
            },
            {
              key: "team_commission",
              label: "团队佣金",
              children: (
                <div style={{ padding: "32px", paddingTop: 0 }}>
                  <Column
                    height={350}
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
                </div>
              ),
            },
          ]}
        />
      </div>
    </Card>
  );
};
