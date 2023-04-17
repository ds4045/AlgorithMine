import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const MapComponent = () => {
  const defaultState = {
    center: [55.752624, 37.59158],
    zoom: 9,
  };

  return (
    <YMaps>
      <Map defaultState={defaultState}>
        <Placemark geometry={[55.752624, 37.59158]} />
      </Map>
    </YMaps>
  );
};
export default MapComponent;
