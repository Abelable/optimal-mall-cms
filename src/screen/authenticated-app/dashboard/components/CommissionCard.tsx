import { Column, Line } from "@ant-design/charts";
import { Card } from "antd";
import { PageTitle, Row } from "components/lib";
import type { CommissionData } from "types/dashboard";

export const CommissionCard = ({
  commissionData,
  loading,
}: {
  commissionData: CommissionData | undefined;
  loading: boolean;
}) => {
  // const data = ;

  // const data =

  // console.log('data', data)
  const config = {
    // data: commissionData?.monthlyCommissionList.map((item) => {
    //   const giftCommission = commissionData.monthlyGiftCommissionList.find(_item => _item.month === item.month)?.sum || 0;
    //   const teamCommission = commissionData.monthlyTeamCommissionList.find(_item => _item.month === item.month)?.sum || 0;
    //   return [
    //       {
    //       name: "商品佣金",
    //       month: item.month,
    //       sum: +item.sum.toFixed(2)
    //     },
    //     {
    //       name: "礼包佣金",
    //       month:  item.month,
    //       sum: +giftCommission.toFixed(2)
    //     },
    //     {
    //       name: "团队佣金",
    //       month:  item.month,
    //       sum: +teamCommission.toFixed(2)
    //     }
    //   ]
    // }).reduce((a, b) => [...a, ...b], []),
    data: [
      ...(commissionData?.monthlyCommissionList
        ? commissionData?.monthlyCommissionList.map((item) => ({
            name: "商品佣金",
            month: item.month,
            sum: +item.sum.toFixed(2),
          }))
        : []),
      ...(commissionData?.monthlyGiftCommissionList
        ? commissionData?.monthlyGiftCommissionList.map((item) => ({
            name: "礼包佣金",
            month: item.month,
            sum: +item.sum.toFixed(2),
          }))
        : []),
      ...(commissionData?.monthlyTeamCommissionList
        ? commissionData?.monthlyTeamCommissionList.map((item) => ({
            name: "团队佣金",
            month: item.month,
            sum: +item.sum.toFixed(2),
          }))
        : []),
    ],
    xField: "month",
    yField: "sum",
    colorField: "name",
    group: true,
    style: {
      inset: 5,
    },
    // onReady: ({ chart }: { chart: any }) => {
    //   try {
    //     chart.on('afterrender', () => {
    //       chart.emit('legend:filter', {
    //         data: { channel: 'color', values: ['London'] },
    //       });
    //     });
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },
  };
  return (
    <Card
      loading={loading}
      title={
        <Row>
          <PageTitle>佣金记录</PageTitle>
        </Row>
      }
      style={{ flex: 2 }}
    >
      {/* <Column height={350} {...config} /> */}
      <Line height={350} {...config} />
    </Card>
  );
};
