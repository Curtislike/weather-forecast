import React from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { IWeather } from '../../../../types/weather.types';

import './styles.scss';
import { API_KEY } from './../../../../constants/weatherApi';
import { useSelector } from 'react-redux';
import { getTemperatureMeasurementSelector } from '../../../../store/selectors/temperatureMeasurement.selectors';
import { formatTemperature } from '../../../../utils/temperatureMeasurementConvertation';

interface IMapProps {
  weather: IWeather;
}

const Map = ({ weather }: IMapProps) => {
  const temperatureMeasurement = useSelector(getTemperatureMeasurementSelector);

  return (
    <MapContainer center={[weather.lat, weather.lon]} zoom={4} scrollWheelZoom={false}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <TileLayer url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`} />
      <Marker position={[weather.lat, weather.lon]}>
        <Tooltip permanent>{weather.city + ': ' + formatTemperature(weather?.currentTemp, temperatureMeasurement)}</Tooltip>
      </Marker>
    </MapContainer>
  );
};

export default Map;
