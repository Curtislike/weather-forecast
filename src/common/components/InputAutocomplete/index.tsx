import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import clsx from 'clsx';

import './styles.scss';
import { IInputValues } from '../../../components/Header/components/SearchForm/types/input.types';

interface IInputAutocompleteProps {
  handleChange: any;
  style?: string;
  values?: IInputValues;
}

const formatInputValue = (value: string) => {
  if (value.includes(',')) {
    return value.split(', ')[0];
  } else if (value.includes(' - ')) {
    return value.split(' - ')[0];
  }
};

const InputAutocomplete = ({ handleChange, style, values }: IInputAutocompleteProps) => {
  const handleOnSelectCity = async (value: string) => {
    handleChange({ city: formatInputValue(value) });
  };

  const handleOnChangeCity = (value: string) => {
    handleChange({ city: value });
  };

  return (
    <div className="wrapper">
      <PlacesAutocomplete highlightFirstSuggestion value={values?.city} onChange={handleOnChangeCity} onSelect={handleOnSelectCity}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <input
              {...getInputProps({
                placeholder: 'City name...',
                type: 'search',
                className: style,
                required: true,
              })}
            />
            <div className="autocomplete-dropdown">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = clsx('suggestion-item', suggestion.active && 'suggestion-item-active');
                return (
                  <div {...getSuggestionItemProps(suggestion, { className })} key={suggestion.placeId}>
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default InputAutocomplete;
