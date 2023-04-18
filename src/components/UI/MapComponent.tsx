import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const MapComponent = () => {
  const defaultState = {
    center: [55.780618, 37.543749],
    zoom: 9,
  };

  return (
    <YMaps>
      <Map defaultState={defaultState}>
        <Placemark geometry={[55.780618, 37.543749]} />
      </Map>
    </YMaps>
  );
};
export default MapComponent;
