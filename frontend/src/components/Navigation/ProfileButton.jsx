
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import {NavLink} from 'react-router-dom'
import './ProfileButton.css'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-button-container">
      <button onClick={toggleMenu} className='button'>
        <i className="fa fa-bars" style={{ marginRight: '5px' }}></i>
        <i className="fas fa-user-circle" />
      </button>
      {
        showMenu &&
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <div className='userlogin'>
              <div>Hello, {user.username}</div>
              <div>{user.email}</div>
              <div className='line'></div>
              <div><NavLink to="manage-spots" className='managelink'>Manage Spots</NavLink></div>
              <div className='line'></div>
              <div className='logoutbutton'><button onClick={logout} ><NavLink to ='/' className='logoutbutton'>Log Out</NavLink></button></div>
            </div>
          ) : (
            <div className='log'>
                <OpenModalMenuItem
                  itemText="Log In"
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onButtonClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
            </div>
          )}
        </ul>
      }
    </div>
  );
}

export default ProfileButton;
