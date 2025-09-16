import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { clearOrderData, createOrder } from '../../services/slices/ordersSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { constructorItems } = useSelector((state) => state.constructorData);
  const { orderRequest, order } = useSelector((state) => state.orders);
  const { isAuthenticated } = useSelector((state) => state.user);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ids = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id)
    ];
    dispatch(createOrder(ids)).then(() => {
      dispatch(clearConstructor());
    });
  };

  const onCloseOrderModal = () => {
    dispatch(clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={onCloseOrderModal}
    />
  );
};
