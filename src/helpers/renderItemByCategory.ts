import { CategoryType, Item } from '../types/types';

export const renderItemByCategory = (category: CategoryType, items: Item[]) => {
  switch (category) {
    case 'Asic':
      return items.filter((el) => el.section === 'Asic');
    case 'WhatsMiner':
      return items.filter((el) => el.maker === 'WhatsMiner');
    case 'Antminer':
      return items.filter((el) => el.maker === 'Antminer');
    case 'AvalonMiner':
      return items.filter((el) => el.maker === 'AvalonMiner');
    case 'Innosilicon':
      return items.filter((el) => el.maker === 'Innosilicon');
    case 'Gold Shell':
      return items.filter((el) => el.maker === 'Gold Shell');
    case 'Parts':
      return items.filter((el) => el.section === 'Parts');
    case 'Accessory':
      return items.filter((el) => el.section === 'Accessory');
    case 'NVIDIA':
      return items.filter((el) => el.maker === 'NVIDIA');
    case 'AMD':
      return items.filter((el) => el.maker === 'AMD');
    case 'MSI':
      return items.filter((el) => el.maker === 'MSI');
    case 'ASUS':
      return items.filter((el) => el.maker === 'ASUS');
    case 'GPU':
      return items.filter((el) => el.section === 'GPU');
    default:
      return [];
  }
};
