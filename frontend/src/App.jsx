import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import SignupFormPage from './components/SignupFormModal/SignupFormModal';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import SpotDetails from './components/SpotDetails/SpotDetails';
import GetAllSpot from './components/GetAllSpot/GetAllSpot';
import Reviews from './components/SpotDetails/Reviews';
import CreateSpotForm from './components/Navigation/CreateSpotForm';
import ManageSpots from './components/Navigation/ManageSpots'
import DeleteSpotModal from './components/DeleteSpotModal/DeleteSpotModal';
import DeleteReviewModal from './components/DeleteReviewModal/DeleteReviewModal'
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
      {
        path:'/',
        element:<GetAllSpot/>
      },

      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path:'/spots/:spotId/reviews',
        element:<Reviews/>
      },
      {
        path:'/create-spot',
        element:<CreateSpotForm mode="create"/>
      },
      {
        path:'/manage-spots',
        element:<ManageSpots/>
      },
      {
        path:'/update-spot/:spotId',
        element:<CreateSpotForm mode="update"/>
      },
      {
        path:'/delete-spot',
        element:<DeleteSpotModal/>
      },
      {
        path:'/delete-review',
        element:<DeleteReviewModal/>
      }

    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
