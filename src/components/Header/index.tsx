import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
import CurrentParams from './components/CurrentParams';
import SearchForm from './components/SearchForm';
import Switcher from '../../common/components/Switcher';
import settingsImage from '../../assets/settings.png';
import Menu from '../../common/components/Menu';
import { DEGREE_CELSIUS, DEGREE_FAHRENHEIT } from '../../constants/mesurement';
import WeatherImage from '../../common/components/WeatherImage';
import { getCurrentWeatherSelector } from '../../store/selectors/currentWeather.selectors';
import { formatTemperature } from '../../utils/temperatureMeasurementConvertation';
import { getTemperatureMeasurementSelector } from '../../store/selectors/temperatureMeasurement.selectors';
import { ICurrentWeather } from '../../types/weather.types';
import Favourites from './components/Favourites';

const Header = (): JSX.Element => {
  const weather: ICurrentWeather = useSelector(getCurrentWeatherSelector);
  const temperatureMeasurement = useSelector(getTemperatureMeasurementSelector);

  return (
    <header className={styles.header}>
      <div className={styles.firstWrap}>
        <div className={styles.locationWrap}>
          <div className={styles.city}>{`${weather.city}, ${weather.country}`}</div>
          <div className={styles.time}>{weather.time}</div>
          <div className={styles.date}>{weather.date}</div>
        </div>
        <div className={styles.temperatureWrap}>
          <WeatherImage imageId={weather.icon} />
          <div className={styles.degrees}>{formatTemperature(weather.temperature, temperatureMeasurement)}</div>
        </div>
        <Menu />
      </div>
      <div className={styles.secondWrap}>
        <div className={styles.itemParam}>
          <CurrentParams weather={weather} />
          <SearchForm />
        </div>
        <div className={styles.itemSettings}>
          <div className={styles.switcherWrap}>
            <div>{DEGREE_CELSIUS}</div>
            <Switcher />
            <div>{DEGREE_FAHRENHEIT}</div>
          </div>
          <div className={styles.imgWrapper}>
            <Favourites />
            <img className={styles.settingsImg} src={settingsImage} alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
