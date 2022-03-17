import React from 'react';

import styles from './styles.module.scss';
import { ICurrentWeather } from '../../../../types/weather.types';

interface IParamsProps {
  weather: ICurrentWeather;
}

const CurrentParams = ({ weather }: IParamsProps): JSX.Element => {
  const { humidity, pressure, wind } = weather;

  const parameters = [
    { parameter: 'Wind m/s', value: wind },
    { parameter: 'Humidity %', value: humidity },
    { parameter: 'Pressure hPa', value: pressure },
  ];

  return (
    <div className={styles.paramsWrapper}>
      {parameters.map((param, index) => (
        <div key={index} className={styles.param}>
          <div className={styles.name}>{param.parameter}</div>
          <div className={styles.value}>{param.value}</div>
        </div>
      ))}
    </div>
  );
};

export default CurrentParams;
