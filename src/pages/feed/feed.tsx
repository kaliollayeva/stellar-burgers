import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  const handleRefreshOrders = () => {
    dispatch(fetchFeed());
  };

  if (isLoading || !data.orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={data.orders} handleGetFeeds={handleRefreshOrders} />;
};
