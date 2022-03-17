import React, { useCallback, useEffect, useRef, useState } from 'react';
import Sidebar from '../../../../common/components/Sidebar';

import { getFavouritesSelector } from './../../../../store/selectors/favourites.selectors';
import { useDispatch, useSelector } from 'react-redux';
import FavouriteButton from '../../../../common/components/FavouriteButton';
import { fetchCardByCoordinates } from '../../../../store/actions/cards.actions';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';
import styles from './styles.module.scss';

const Favourites = (): JSX.Element => {
  const dispatch = useDispatch();
  const favourites = useSelector(getFavouritesSelector);
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpened(false));

  const showFavourites = () => setIsOpened(!isOpened);

  const addFavouriteCard = useCallback((lat, lon) => {
    dispatch(fetchCardByCoordinates(lat, lon));
    setIsOpened(false);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <FavouriteButton width="20px" height="20px" onClick={showFavourites} />
      <Sidebar isOpened={isOpened} onClose={showFavourites}>
        {favourites.length > 0 ? (
          <div className={styles.wrapper}>
            <ul>
              {favourites.map(({ id, cityName, lat, lon }) => (
                <li key={id} onClick={() => addFavouriteCard(lat, lon)}>
                  {cityName}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={styles.text}>There are no cities in favourites yet...</div>
        )}
      </Sidebar>
    </div>
  );
};

export default Favourites;
