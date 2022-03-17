export interface IChartDataset {
  label: string;
  data: Array<number | undefined>;
  borderColor: string;
  backgroundColor: string;
}

export interface IChartData {
  labels: Array<string | undefined>;
  datasets: IChartDataset[];
}
