import { NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
        <div>
        <NavLink to="/">
          <div className='logo'>
          <img src='https://media.designrush.com/inspiration_images/135187/conversions/_1511452487_364_Airbnb-mobile.jpg' alt='airbnb logo'/>
          </div>
          </NavLink>
      </div>
      <div className='right-nav'>
      {sessionUser && (
        <div>
          <NavLink to="/create-spot">Create a New Spot</NavLink>
        </div>
      )}

      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
    </ul>
  );
}

export default Navigation;
