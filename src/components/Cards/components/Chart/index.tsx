import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import { IChartData, IChartDataset } from './types';

import styles from './styles.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IChartProps {
  data: IChartData;
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        stepSize: 1,
        font: {
          size: 11,
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
};

const Chart = ({ data }: IChartProps) => (
  <div className={styles.wrapper}>
    <Line options={options} data={data} />
  </div>
);

export default Chart;
export type { IChartData, IChartDataset };
