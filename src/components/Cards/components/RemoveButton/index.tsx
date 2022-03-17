import React, { useCallback } from 'react';

import styles from './styles.module.scss';
import removeImg from '../../../../assets/remove.png';

interface IRemoveButtonProps {
  onClick(): void;
}

const RemoveButton = ({ onClick }: IRemoveButtonProps): JSX.Element => (
  <div className={styles.wrapper} onClick={onClick}>
    <img src={removeImg} alt="remove" />
  </div>
);

export default RemoveButton;
