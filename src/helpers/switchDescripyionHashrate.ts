import { ItemOptionalFields } from '../types/types';

export const switchDescriptionHashrate = (elem: {
  key: ItemOptionalFields;
  value: string | number;
}) => {
  switch (elem.key) {
    case 'expenditure':
      return elem.value + ' W';
    case 'hashrate': {
      const hr = Number(elem.value);
      if (hr) return hr > 1000 ? elem.value + ' MH/s' : elem.value + ' TH/s';
      else return elem.value;
    }
    default:
      return elem.value;
  }
};
