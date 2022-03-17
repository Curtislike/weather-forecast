import React, { Dispatch, SetStateAction, useState } from 'react';

import styles from './styles.module.scss';
import { SearchType } from '../../../types/search.types';

interface IDropdownProps {
  selectedType: SearchType;
  onChange: Dispatch<SetStateAction<SearchType>>;
}

const selectButtons = [
  { type: SearchType.CityName, label: 'City name' },
  { type: SearchType.Coordinates, label: 'Coordinates' },
  { type: SearchType.ZIP, label: 'ZIP code' },
];

const Dropdown = ({ selectedType, onChange }: IDropdownProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.dropdown}>
      <div className={styles.btn} onClick={(e) => setIsActive(!isActive)}>
        {selectButtons[selectedType].label}
        <p className={styles.arrowDown}></p>
      </div>
      {isActive && (
        <div className={styles.content}>
          {selectButtons.map((button) => (
            <div
              key={button.type}
              onClick={() => {
                onChange(button.type);
                setIsActive(false);
              }}
              className={styles.item}
            >
              {button.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
