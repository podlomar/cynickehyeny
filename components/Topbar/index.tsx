import React from 'react';
import styles from './styles.module.scss';

export const Topbar = (): JSX.Element => {
  return (
    <div className={styles.topbar}>
      <img className={styles.brandIcon} src="/icon.svg" />
      <span className={styles.brandName}>Cynické Hyeny</span>
    </div>
  );
};

export default Topbar;