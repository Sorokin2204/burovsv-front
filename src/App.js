import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useRoutes } from 'react-router';
import { Navigate } from 'react-router';
import { authEmployee } from './redux/actions/employee/auth.action';
import { useEffect } from 'react';
import AuthPage from './components/pages/AuthPage';
import HomePage from './components/pages/HomePage';
import MainLayout from './components/MainLayout';
import Loading from './components/Loading';
import { setAuth } from './redux/slices/app.slice';
import AdminNewsPage from './components/pages/AdminNewsPage';
import AdminTestingPage from './components/pages/AdminTestingPage';
import AdminEmployeePage from './components/pages/AdminEmployeePage';
import NewsSinglePage from './components/pages/NewsSinglePage';
import TestingPage from './components/pages/TestingPage';
import StudyPage from './components/pages/StudyPage';
import SearchPage from './components/pages/SearchPage';
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    authEmployee: { loading, data, error },
  } = useSelector((state) => state.employee);
  const { auth } = useSelector((state) => state.app);

  useEffect(() => {
    if (!data && !loading && error) {
      dispatch(setAuth(null));
    }
    if (data && !loading && !error) {
      dispatch(setAuth(data));
    }
  }, [data, loading, error]);

  useEffect(() => {
    dispatch(authEmployee());
  }, []);
  useEffect(() => {
    if (auth === null) {
      navigate('/auth');
    }
  }, [auth]);

  let routes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/auth', element: <AuthPage /> },
    { path: '/news/:newsId', element: <NewsSinglePage /> },
    { path: '/search/', element: <SearchPage /> },

    { path: '/study/', element: <StudyPage /> },
    { path: '/testing', element: <TestingPage /> },
    { path: '/admin/news', element: auth?.role === 'admin' ? <AdminNewsPage /> : <Navigate to="/" /> },
    { path: '/admin/training', element: auth?.role === 'admin' ? <AdminTestingPage /> : <Navigate to="/" /> },
    { path: '/admin/users', element: auth?.role === 'admin' ? <AdminEmployeePage /> : <Navigate to="/" /> },
  ]);
  return (
    <>
      {auth === undefined && <Loading />}
      {auth && <MainLayout>{routes}</MainLayout>}
      {auth === null && location.pathname == '/auth' && routes}
    </>
  );
}

export default App;
