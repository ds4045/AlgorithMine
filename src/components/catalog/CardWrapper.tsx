import { FC, memo } from 'react';
import { renderItemByCategory } from '../../helpers/renderItemByCategory';
import CardHorizontal from './cards/CardHorizontal';
import CardTable from './cards/CardTable';
import { middleScore } from '../../helpers/middleScore';
import useAlert from '../../hooks/useAlert';
import { useAppSelector } from '../../redux/hooks';
type CardWrapperProps = {
  cardsPosition: 'cards_horizontal' | 'cards_table';
};
const CardWrapper: FC<CardWrapperProps> = ({ cardsPosition }) => {
  const items = useAppSelector((state) => state.items.searchedItems);
  const currentCategory = useAppSelector((state) => state.currentCategory.currentCategory);
  const [alertSuccess, alertError, contextHolder] = useAlert();

  const horizontalItems = renderItemByCategory(currentCategory, items).map((el) => (
    <CardHorizontal
      key={el.id}
      item={el}
      score={middleScore(el)}
      alertSuccess={alertSuccess}
      alertError={alertError}
    />
  ));

  const tableItems = renderItemByCategory(currentCategory, items).map((el) => (
    <CardTable
      key={el.id}
      item={el}
      score={middleScore(el)}
      alertSuccess={alertSuccess}
      alertError={alertError}
    />
  ));
  return (
    <>
      {contextHolder}
      {cardsPosition === 'cards_horizontal' ? horizontalItems : tableItems}
    </>
  );
};

export default memo(CardWrapper);
