import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Chart, { IChartDataset } from '../Chart';
import { formatGraphData, formatGraphDataset } from '../Chart/utils/formatGraphData';
import Button from '../../../../common/components/Button';
import InputAutocomplete from '../../../../common/components/InputAutocomplete';
import { getWeatherByCity } from '../../../../services/getWeatherApi';
import { getTemperatureMeasurementSelector } from '../../../../store/selectors/temperatureMeasurement.selectors';
import { IWeather } from '../../../../types/weather.types';
import { IInputValues } from '../../../Header/components/SearchForm/types/input.types';
import { defaultGraphColor } from '../../constants/defaultGraphColor';

import styles from './styles.module.scss';
import { showNotification } from './../../../../utils/showNotification';
import { invalidCityValue } from '../../../../constants/notificationMessages';

interface ICompareProps {
  weather: IWeather;
}

const MAX_NUMBER_OF_CITIES = 5;

const isNotIncludes = (compareDataset: IChartDataset[], comparedWeather: IChartDataset): boolean =>
  compareDataset.find((item) => item.label === comparedWeather.label) ? false : true;

const Compare = ({ weather }: ICompareProps) => {
  const [values, setValues] = useState<IInputValues>({});
  const [comparedWeather, setComparedWeather] = useState<IChartDataset>();
  const temperatureMeasurement = useSelector(getTemperatureMeasurementSelector);
  const [compareDataset, setCompareDataset] = useState([formatGraphDataset(weather, temperatureMeasurement, defaultGraphColor)]);

  const data = formatGraphData(weather, compareDataset);

  const resetValues = () => {
    setValues({ city: '' });
  };

  useEffect(() => {
    if (comparedWeather && isNotIncludes(compareDataset, comparedWeather) && compareDataset.length < MAX_NUMBER_OF_CITIES) {
      console.log(comparedWeather);
      setCompareDataset((compareDataset) => [...compareDataset, comparedWeather]);
    }
  }, [comparedWeather]);

  const handleChange = (values: IInputValues) => {
    setValues(values);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (values.city) {
      try {
        const weather = await getWeatherByCity(values.city);
        const comparedWeather = formatGraphDataset(weather, temperatureMeasurement);
        setComparedWeather(comparedWeather);
        resetValues();
      } catch (err) {
        showNotification(invalidCityValue);
        resetValues();
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <Chart data={data} />
      <form onSubmit={handleSubmit} className={styles.content}>
        <InputAutocomplete handleChange={handleChange} style="input-compare" values={values} />
        <Button title="Add" isDisabled={!values.city} />
      </form>
    </div>
  );
};

export default Compare;
