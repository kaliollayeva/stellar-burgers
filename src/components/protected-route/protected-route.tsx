import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import { useEffect } from 'react';
import { getUser } from '../../services/slices/userSlice';

type Props = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children, onlyUnAuth }: Props) => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user.data);
  const location = useLocation();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
