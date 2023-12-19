import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleError = async (res) => {
    if (res.status === 401) {
      setErrors({ credential: 'The provided credentials were invalid' });
    } else {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(handleError)
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential: 'FakeUser3', password: 'password4' }))
      .then(closeModal)
      .catch(handleError)
  };

  return (
    <>
      <h1>Log In</h1>
      {errors.credential && (
          <div className='errors'>{errors.credential}</div>
        )}
      <form onSubmit={handleSubmit}>
        <label className='border'>
          <input
            type="text"
            placeholder='Username or Email'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <div className='login'>
          <button type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
          <a href='#' onClick={handleDemoLogin} className='demolink'>Demo User</a>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
