import { ApexOptions } from 'apexcharts';

export interface IChart {
  chartLabels: string[];
  chartColors: string[];
  chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries;
  height?: string | number;
  width?: string | number;
  legend?: 'none' | 'top' | 'right' | 'bottom' | 'left';
  customOptions?: ApexOptions;
}
