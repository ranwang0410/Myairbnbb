
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './ProfileButton.css'
import { NavLink } from 'react-router-dom'
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
    <>
      <button onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
      </button>
<<<<<<< HEAD
      {
        showMenu &&
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.firstName} {user.lastName}</li>
              <li>{user.email}</li>
              <li>
=======

        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>

              <li>Hello, {user.username}</li>
              {/* <li>{user.firstName} {user.lastName}</li> */}
              <li>{user.email}</li>
              <li>
              <NavLink to="/manage-spots">Manage Spots</NavLink>
            </li>
              <li>
>>>>>>> dev
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
<<<<<<< HEAD
              <li>
                <OpenModalMenuItem
                  itemText="Log In"
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li>
=======
            <span>
>>>>>>> dev
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onButtonClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
<<<<<<< HEAD
              </li>
            </>
          )}
        </ul>
      }
=======
              </span>
              <span>
                <OpenModalMenuItem
                  itemText="Log In"
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </span>

            </>
          )}
        </ul>

>>>>>>> dev
    </>
  );
}

export default ProfileButton;
