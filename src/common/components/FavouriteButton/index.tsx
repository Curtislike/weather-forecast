import React from 'react';
import styles from './styles.module.scss';
import starImg from '../../../assets/star.png';
import goldenStarImg from '../../../assets/goldenStar.png';

interface IFavouriteButtonProps {
  width?: string;
  height?: string;
  onClick?(): void;
  isFavourite?: boolean;
}

const IMAGE_SIZE = '16px';

const FavouriteButton = ({ width, height, onClick, isFavourite }: IFavouriteButtonProps) => {
  return (
    <button className={styles.favouriteButton} onClick={onClick}>
      <img src={isFavourite ? goldenStarImg : starImg} alt="star" style={{ width: width || IMAGE_SIZE, height: height || IMAGE_SIZE }} />
    </button>
  );
};

export default React.memo(FavouriteButton);
