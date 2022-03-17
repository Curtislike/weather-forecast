import React from 'react';
import styles from './styles.module.scss';

interface ISidebarPops {
  children?: JSX.Element | JSX.Element[];
  isOpened: boolean;
  onClose: () => void;
}

const Sidebar = ({ children, isOpened, onClose }: ISidebarPops): JSX.Element => (
  <div className={`${styles.sidebar} ${isOpened && styles.activeSidebar}`}>
    <div className={styles.closeBtn} onClick={onClose}>
      &times;
    </div>
    {children}
  </div>
);

export default Sidebar;
