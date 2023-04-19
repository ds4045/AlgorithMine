const allMakers = [
  'WhatsMiner',
  'Antminer',
  'AvalonMiner',
  'Innosilicon',
  'Gold Shell',
  'Parts',
  'Accessory',
  'NVIDIA',
  'AMD',
  'MSI',
  'ASUS',
];
const allSections = ['Asic', 'Accessories', 'GPU'];
export const validateSwitchFormItem = (filed: string, value: string | number) => {
  switch (filed) {
    case 'currency':
    case 'title':
    case 'images':
    case 'description':
    case 'descriptionRU': {
      return typeof value === 'string' && value.trim().length > 0;
    }
    case 'maker': {
      return typeof value === 'string' && allMakers.includes(value);
    }
    case 'section': {
      return typeof value === 'string' && allSections.includes(value);
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
