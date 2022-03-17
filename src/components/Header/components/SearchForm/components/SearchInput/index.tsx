import React from 'react';

import { SearchType } from '../../../../../../types/search.types';
import { IEventValue, IInputValues } from '../../types/input.types';
import InputAutocomplete from '../../../../../../common/components/InputAutocomplete';
import './styles.scss';

interface ISearchInputProps {
  selectedType: SearchType;
  handleChange: any;
  values: IInputValues;
}

const SearchInput = ({ selectedType, handleChange, values }: ISearchInputProps) => {
  const handleInputChangeCoordinates = (e: IEventValue) => {
    const newValues = Object.assign({ latitude: values?.latitude, longitude: values?.longitude }, { [e.target.name]: e.target.value });
    handleChange(newValues);
  };

  const handleInputChangeZip = (e: IEventValue) => {
    const newValues = Object.assign({ ZIP: values?.ZIP, country: values?.country }, { [e.target.name]: e.target.value });
    handleChange(newValues);
  };

  switch (selectedType) {
    case SearchType.CityName:
      return <InputAutocomplete handleChange={handleChange} values={values} style="header-input" />;
    case SearchType.Coordinates:
      return (
        <>
          <input
            className="coordinates"
            name="latitude"
            type="number"
            value={values.latitude}
            onChange={handleInputChangeCoordinates}
            placeholder="Latitude.."
            min="-90"
            max="90"
            required
          />
          <input
            className="coordinates"
            name="longitude"
            type="number"
            value={values.longitude}
            onChange={handleInputChangeCoordinates}
            placeholder="Longitude.."
            min="-180"
            max="180"
            required
          />
        </>
      );
    case SearchType.ZIP:
      return (
        <>
          <input className="zip" name="ZIP" value={values.ZIP} type="string" onChange={handleInputChangeZip} placeholder="ZIP code..." required />
          <input
            className="zip"
            name="country"
            value={values.country}
            type="string"
            onChange={handleInputChangeZip}
            placeholder="Country code..."
            required
          />
        </>
      );
  }
};

export default SearchInput;
