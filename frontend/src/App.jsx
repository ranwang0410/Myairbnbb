import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import SignupFormPage from './components/SignupFormModal/SignupFormModal';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import SpotDetails from './components/SpotDetails/SpotDetails';
import GetAllSpot from './components/GetAllSpot/GetAllSpot'
function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // {
      //   path: '/',
      //   element: <h1>Welcome!</h1>
      // },

      {
        path:'/',
        element:<GetAllSpot/>
      },

      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
