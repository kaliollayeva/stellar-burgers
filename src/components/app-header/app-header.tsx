import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector((state) => state.user.data);
  const userName = user?.name;

  return <AppHeaderUI userName={userName ?? 'Личный кабинет'} />;
};
