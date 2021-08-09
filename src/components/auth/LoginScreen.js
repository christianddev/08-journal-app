import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { startLoginGoogle, startLoginWithEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/userForm";
import validator from 'validator';
import {serError, removeError }  from '../../actions/ui';

const LoginScreen = () => {

  const dispatch = useDispatch();
  const { ui: { msgError, loading } } = useSelector(state => state);

  const [formValues, handleInputChange] = useForm({
    email: 'userxd1@email.com',
    password: '123123'
  })

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(serError('Invalid email'));
      return false;
    }else if (password.length < 5) {
      dispatch(serError('Password should be at least 6 characters'));
      return false;
    }

    dispatch(removeError());
    return true;
  }

  const handleLogin = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginWithEmailPassword(email, password));
    }
  }

  const handleGoogleLogin = () => {
    dispatch(startLoginGoogle());
  }

  const {email, password} = formValues;

  return (
    <div>
      <h3 className="auth__title mb-5">Login</h3>
      <form onSubmit={handleLogin}>
        {
          msgError && ( <div className="auth__alert-error"> {msgError} </div> )
        }
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
           />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          autoComplete="off"
          value={password}
          onChange={handleInputChange}
           />
        <button
          className="btn btn-primary btn-block mb-5"
          type="submit"
          disabled={ loading }
          >Login</button>
        <hr />
        <div className="auth__social-networks">
          <p>Login with Social Networks</p>
          <div
            className="google-btn"
            onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
          <Link
            className="link"
            to="/auth/register"
            >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
