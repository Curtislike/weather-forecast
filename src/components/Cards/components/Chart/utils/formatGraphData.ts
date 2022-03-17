import { IChartData, IChartDataset } from '../types';
import { IWeather } from '../../../../../types/weather.types';
import { formatTemperatureNumber } from '../../../../../utils/temperatureMeasurementConvertation';
import { getRandomColor } from '../../../../../utils/getRandomColor';

export const formatGraphData = (weather: IWeather, dataset: IChartDataset[]): IChartData => ({
  labels: weather.daily.map((item) => item.date),
  datasets: dataset,
});

export const formatGraphDataset = (weather: IWeather, temperatureMeasurement: number, color = getRandomColor()): IChartDataset => ({
  label: weather.city,
  data: weather.daily.map((item) => formatTemperatureNumber(item.dayTemperature, temperatureMeasurement)),
  borderColor: color,
  backgroundColor: color,
});
