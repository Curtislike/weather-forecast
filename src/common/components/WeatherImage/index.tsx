import React from 'react';

import './styles.module.scss';
import clearSkyImg from '../../../assets/clear.png';
import fewClousImg from '../../../assets/fewClouds.png';
import scatteredCloudsImg from '../../../assets/scatteredClouds.png';
import brokenCloudsImg from '../../../assets/brokenClouds.png';
import showerRainImg from '../../../assets/showerRain.png';
import rainImg from '../../../assets/rain.png';
import thunderstormImg from '../../../assets/thunderstorm.png';
import snowImg from '../../../assets/snow.png';
import mistImg from '../../../assets/mist.png';

interface IWeatherImageProps {
  imageId: string;
}

export const weatherImages: { [key: string]: string } = {
  '01d': clearSkyImg,
  '01n': clearSkyImg,
  '02d': fewClousImg,
  '02n': fewClousImg,
  '03d': scatteredCloudsImg,
  '03n': scatteredCloudsImg,
  '04d': brokenCloudsImg,
  '04n': brokenCloudsImg,
  '09d': showerRainImg,
  '09n': showerRainImg,
  '10d': rainImg,
  '10n': rainImg,
  '11d': thunderstormImg,
  '11n': thunderstormImg,
  '13d': snowImg,
  '13n': snowImg,
  '50d': mistImg,
  '50n': mistImg,
};

const WeatherImage = ({ imageId }: IWeatherImageProps): JSX.Element => {
  return <img src={weatherImages[imageId]} alt="weather-img" />;
};

export default WeatherImage;
