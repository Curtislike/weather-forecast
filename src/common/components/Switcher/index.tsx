import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemperatureMeasurement } from '../../../store/actions/temperatureMeasurement.actions';
import { TemperatureMeasurement } from '../../../store/reducers/temperatureMeasurement.reducer';
import { getTemperatureMeasurementSelector } from '../../../store/selectors/temperatureMeasurement.selectors';

import styles from './styles.module.scss';

const Switcher = (): JSX.Element => {
  const dispatch = useDispatch();
  const temperatureMeasurement = useSelector(getTemperatureMeasurementSelector);
  const handleChange = (event: { target: { checked: boolean } }) => {
    event.target.checked
      ? dispatch(setTemperatureMeasurement(TemperatureMeasurement.Fahrenheit))
      : dispatch(setTemperatureMeasurement(TemperatureMeasurement.Celsius));
  };

  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={handleChange} checked={!!temperatureMeasurement} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default Switcher;
