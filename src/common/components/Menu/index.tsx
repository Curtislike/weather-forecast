import React, { useCallback, useState } from 'react';

import styles from './styles.module.scss';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getFavouritesSelector } from '../../../store/selectors/favourites.selectors';
import { fetchCardByCoordinates } from '../../../store/actions/cards.actions';
import { DEGREE_CELSIUS, DEGREE_FAHRENHEIT } from '../../../constants/mesurement';
import Switcher from '../Switcher';
import { getCurrentWeatherSelector } from '../../../store/selectors/currentWeather.selectors';

const Menu = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const weather = useSelector(getCurrentWeatherSelector);
  const { humidity, pressure, wind } = weather;
  const favourites = useSelector(getFavouritesSelector);

  const parameters = [
    { parameter: 'Wind', value: wind, measurement: 'm/s' },
    { parameter: 'Humidity', value: humidity, measurement: '%' },
    { parameter: 'Pressure', value: pressure, measurement: 'hPa' },
  ];

  const addFavouriteCard = useCallback((lat, lon) => {
    dispatch(fetchCardByCoordinates(lat, lon));
    setIsOpened(false);
  }, []);

  const showSidebar = () => setIsOpened(!isOpened);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperBtn}>
        <span className={styles.openBtn} onClick={showSidebar}>
          &#9776;
        </span>
      </div>
      <Sidebar isOpened={isOpened} onClose={showSidebar}>
        {
          <div className={styles.content}>
            {
              <>
                <div className={styles.currentWeatherParams}>
                  <h3>{weather.city} current weather:</h3>
                  <ul>
                    {parameters.map((param, index) => (
                      <li key={index}>{param.parameter + ' ' + param.value + ' ' + param.measurement}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.favourites}>
                  <h3>Favourites</h3>
                  <ul>
                    {favourites.map(({ id, cityName, lat, lon }) => (
                      <li key={id} onClick={() => addFavouriteCard(lat, lon)}>
                        {cityName}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.measurementSwitcher}>
                  <h3>Temperature measurement</h3>
                  <div className={styles.measurementWrapper}>
                    <div>Change measurement</div>
                    <div className={styles.switcherWrapper}>
                      <div>{DEGREE_CELSIUS}</div>
                      <Switcher />
                      <div>{DEGREE_FAHRENHEIT}</div>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        }
      </Sidebar>
    </div>
  );
};

export default Menu;
