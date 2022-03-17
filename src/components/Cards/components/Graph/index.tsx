import React from 'react';
import { useSelector } from 'react-redux';

import Chart from '../Chart';
import { formatGraphData, formatGraphDataset } from '../Chart/utils/formatGraphData';
import { IWeather } from '../../../../types/weather.types';
import { getTemperatureMeasurementSelector } from '../../../../store/selectors/temperatureMeasurement.selectors';
import { defaultGraphColor } from './../../constants/defaultGraphColor';

interface IGraphProps {
  weather: IWeather;
}

const Graph = ({ weather }: IGraphProps) => {
  const temperatureMeasurement = useSelector(getTemperatureMeasurementSelector);

  const graphDataset = [formatGraphDataset(weather, temperatureMeasurement, defaultGraphColor)];

  const data = formatGraphData(weather, graphDataset);

  return <Chart data={data} />;
};

export default Graph;
