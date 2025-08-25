import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { clearOrders, getOrders } from '../../services/slices/ordersSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { ordersList } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const handleRefreshOrders = () => {
    dispatch(clearOrders());
    dispatch(getOrders());
  };

  if (!ordersList.length) {
    return <Preloader />;
  }

  return <FeedUI orders={ordersList} handleGetFeeds={handleRefreshOrders} />;
};
