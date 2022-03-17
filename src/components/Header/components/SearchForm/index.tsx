import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss';
import SearchInput from './components/SearchInput';
import { IInputValues } from './types/input.types';
import Button from '../../../../common/components/Button';
import Dropdown from './../../../../common/components/Dropdown/index';
import { SearchType } from '../../../../types/search.types';
import { fetchCardByCity, fetchCardByCoordinates, fetchCardByZip } from '../../../../store/actions/cards.actions';
import { getCardsLoadingSelector } from '../../../../store/selectors/cards.selectors';

const SearchForm = (): JSX.Element => {
  const [selectedSearchType, setSearchType] = useState(SearchType.CityName);
  const [values, setValues] = useState<IInputValues>({});
  const dispatch = useDispatch();
  const isCardLoading = useSelector(getCardsLoadingSelector);

  const resetValues = () => {
    switch (selectedSearchType) {
      case SearchType.CityName:
        setValues({ city: '' });
        break;
      case SearchType.Coordinates:
        setValues({ latitude: '', longitude: '' });
        break;
      case SearchType.ZIP:
        setValues({ ZIP: '', country: '' });
        break;
    }
  };

  const isDisabled = (): boolean => {
    switch (selectedSearchType) {
      case SearchType.CityName:
        return !values.city;
      case SearchType.Coordinates:
        return !(values.latitude && values.longitude);
      case SearchType.ZIP:
        return !(values.ZIP && values.country);
    }
  };

  useEffect(() => {
    resetValues();
  }, [selectedSearchType]);

  const handleChange = (values: React.SetStateAction<IInputValues>) => {
    setValues(values);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    switch (selectedSearchType) {
      case SearchType.Coordinates:
        if (values.latitude && values.longitude) {
          dispatch(fetchCardByCoordinates(+values.latitude, +values.longitude, resetValues));
        }
        break;
      case SearchType.CityName:
        if (values.city) {
          dispatch(fetchCardByCity(values.city, resetValues));
        }
        break;
      case SearchType.ZIP:
        if (values.ZIP && values.country) {
          dispatch(fetchCardByZip(values.ZIP, values.country, resetValues));
        }
        break;
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <SearchInput selectedType={selectedSearchType} handleChange={handleChange} values={values} />
        <Button title="Search" style={styles.buttonSearch} isLoading={isCardLoading} isDisabled={isDisabled()} />
      </form>
      <Dropdown selectedType={selectedSearchType} onChange={setSearchType} />
    </div>
  );
};

export default SearchForm;
