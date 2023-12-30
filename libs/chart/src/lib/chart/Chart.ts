import { ApexOptions } from 'apexcharts';

export interface IChartData {
  label: string;
  value: number;
  color: string;
}

export interface IChart {
  chartData: IChartData[];
  height?: string | number;
  width?: string | number;
  legend?: 'none' | 'top' | 'right' | 'bottom' | 'left';
  customOptions?: ApexOptions;
}
