import React from 'react';
import Loader from 'react-loader-spinner';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface IButtonProps {
  title: string;
  style?: any;
  onClick?(): void;
  isActive?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button = ({ title, style, onClick, isActive, isLoading, isDisabled }: IButtonProps) => (
  <button
    disabled={isLoading || isDisabled}
    onClick={onClick}
    className={clsx(styles.button, style, isActive && styles.active, isDisabled && styles.disabled)}
  >
    {!isLoading ? title : <Loader type="Oval" color="#FFFFFF" height={15} width={15} />}
  </button>
);

export default Button;
