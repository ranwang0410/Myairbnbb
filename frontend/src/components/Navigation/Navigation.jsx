import { NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
        <li>
        <NavLink to="/">
          <div className='logo'>
          <img src='https://media.designrush.com/inspiration_images/135187/conversions/_1511452487_364_Airbnb-mobile.jpg' alt='airbnb logo'/>
          </div>
          </NavLink>
      </li>
      <div className='right-nav'>
      {sessionUser && (
        <li>
          <NavLink to="/create-spot">Create a New Spot</NavLink>
        </li>
      )}

      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </div>
    </ul>
  );
}

export default Navigation;
