import React from 'react';

import styles from './styles.module.scss';
import WeatherImage from '../../../../common/components/WeatherImage';
import { formatTemperature } from '../../../../utils/temperatureMeasurementConvertation';
import { IWeather } from '../../../../types/weather.types';
import { useSelector } from 'react-redux';
import { getTemperatureMeasurementSelector } from '../../../../store/selectors/temperatureMeasurement.selectors';

interface ITableProps {
  weather: IWeather;
}

const Table = ({ weather }: ITableProps) => {
  const temperatureMeasurement = useSelector(getTemperatureMeasurementSelector);

  return (
    <div className={styles.content}>
      {weather?.daily.map(({ date, dayTemperature, icon, id }) => (
        <div key={id} className={styles.dailyWeather}>
          <div className={styles.day}>{date}</div>
          <WeatherImage imageId={icon} />
          <div className={styles.temperature}>{formatTemperature(dayTemperature, temperatureMeasurement)}</div>
        </div>
      ))}
    </div>
  );
};

export default Table;
