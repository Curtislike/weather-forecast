import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Table from './components/Table';
import Map from './components/Map';
import Graph from './components/Graph';
import Compare from './components/Compare';
import RemoveButton from './components/RemoveButton';
import Button from '../../common/components/Button';
import FavouriteButton from '../../common/components/FavouriteButton';
import { CardContentType } from '../../types/cardContent.types';
import { getTemperatureMeasurementSelector } from '../../store/selectors/temperatureMeasurement.selectors';
import { formatTemperature } from '../../utils/temperatureMeasurementConvertation';
import { IWeather } from '../../types/weather.types';
import { removeCard } from '../../store/actions/cards.actions';
import { addToFavourites, removeFromFavourites } from '../../store/actions/favourites.actions';
import { checkIsFavouriteSelector } from './../../store/selectors/favourites.selectors';

import styles from './styles.module.scss';

interface ICardProps {
  weather: IWeather;
}

const selectButtons = [
  { type: CardContentType.Table, label: 'Table', renderContent: (weather: IWeather) => <Table weather={weather} /> },
  {
    type: CardContentType.Graph,
    label: 'Graph',
    renderContent: (weather: IWeather) => <Graph weather={weather} />,
  },
  { type: CardContentType.Map, label: 'Map', renderContent: (weather: IWeather) => <Map weather={weather} /> },
  {
    type: CardContentType.Compare,
    label: 'Compare',
    renderContent: (weather: IWeather) => <Compare weather={weather} />,
  },
];

const Card = ({ weather }: ICardProps): JSX.Element => {
  const dispatch = useDispatch();
  const [selectedType, setType] = useState(selectButtons[0].type);
  const temperatureMeasurement = useSelector(getTemperatureMeasurementSelector);
  const isFavourite = useSelector(checkIsFavouriteSelector(weather));

  const handleCardRemove = useCallback(() => dispatch(removeCard(weather.id)), [weather.id]);

  const handleClickFavourites = useCallback(
    () => (isFavourite ? dispatch(removeFromFavourites(weather)) : dispatch(addToFavourites(weather))),
    [isFavourite, weather]
  );

  return (
    <div className={styles.card}>
      {weather && (
        <>
          <div className={styles.cardHeaderWrap}>
            <div className={styles.cardHeaderInfo}>
              <div className={styles.location}>
                {weather.city ? `${weather.city}, ${weather.country}` : `Lat: ${weather.lat}, Lon: ${weather.lon}`}
              </div>
              <div className={styles.temperature}>{formatTemperature(weather?.currentTemp, temperatureMeasurement)}</div>
            </div>
            <div className={styles.cardHeaderOptions}>
              <div className={styles.time}>{weather?.currentTime}</div>
              <FavouriteButton onClick={handleClickFavourites} isFavourite={isFavourite} />
              <RemoveButton onClick={handleCardRemove} />
            </div>
          </div>
          {selectButtons[selectedType].renderContent(weather)}
          <div className={styles.buttons}>
            {selectButtons.map(({ type, label }) => (
              <Button key={type} title={label} onClick={() => setType(type)} isActive={selectedType === type} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
