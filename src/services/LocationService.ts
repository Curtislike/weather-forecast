interface ICoordinates {
  latitude: number;
  longitude: number;
}

export default class LocationService {
  static async getCurrentCoordinates() {
    const coordinates = new Promise<ICoordinates>((resolve) => {
      navigator.geolocation.getCurrentPosition((position: { coords: ICoordinates }) => {
        resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      });
    });
    return await coordinates;
  }
}
