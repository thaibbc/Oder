import { BarChart } from '@mui/x-charts/BarChart';
import { dataset, valueFormatter } from '../dataset/dataset';

const chartSetting = {
  yAxis: [
    {
      label: 'Doanh thu (VNĐ)',
      width: 100,
    },
  ],
  series: [{ dataKey: 'revenue', label: 'Doanh thu tháng', valueFormatter }],
  height: 300,
};

export default function TickPlacementBars() {
  return (
      <div style={{ width: '50%' }}>
        <BarChart
          dataset={dataset}
          xAxis={[{ dataKey: 'month', tickPlacement: 'middle', tickLabelPlacement: 'middle' }]}
          {...chartSetting}
          sx={{
            '& .MuiChartsLegend-root span': {
            color: 'black !important',
            fontWeight: 'bold',
          },
          }}
        />
      </div>
  );
}
