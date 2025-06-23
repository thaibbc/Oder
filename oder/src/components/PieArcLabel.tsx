import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { productStats, valueFormatter } from '../dataset/webUsageStats';

export default function PieArcLabel() {
  return (
    <PieChart
      series={[
        {
          data: productStats,
          arcLabel: valueFormatter,
          arcLabelMinAngle: 10,
          arcLabelRadius: '60%',
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'black',
          fontWeight: 'bold',
        },
        '& .MuiChartsLegend-root span': {
            color: 'black !important',
         },
      }}
      {...size}
    />
  );
}



const size = {
  width: 200,
  height: 200,
};

