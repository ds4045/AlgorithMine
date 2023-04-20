export const allMakers = [
  { label: 'WhatsMiner', value: 'WhatsMiner' },
  { label: 'Antminer', value: 'Antminer' },
  { label: 'AvalonMiner', value: 'AvalonMiner' },
  { label: 'Innosilicon', value: 'Innosilicon' },
  { label: 'Gold Shell', value: 'Gold Shel' },
  { label: 'Parts', value: 'Parts' },
  { label: 'Accessory', value: 'Accessory' },
  { label: 'NVIDIA', value: 'NVIDIA' },
  { label: 'AMD', value: 'AMD' },
  { label: 'MSI', value: 'MSI' },
  { lavel: 'ASUS', value: 'ASUS' },
];
export const validateSwitchFormItem = (filed: string, value: string | number) => {
  switch (filed) {
    case 'text':
    case 'image':
    case 'currency':
    case 'title':
    case 'images':
    case 'description':
    case 'descriptionRU': {
      return typeof value === 'string' && value.trim().length > 0;
    }
    case 'hashrate':
    case 'payback':
    case 'profit':
    case 'expenditure':
    case 'price': {
      return Number(value) > 0;
    }
    default:
      return false;
  }
};
