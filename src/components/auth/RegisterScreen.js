import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/userForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import {serError, removeError }  from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { ui: { msgError } } = useSelector(state => state);

  const [formValues, handleInputChange ]= useForm({
    name: 'userXD',
    email: 'userxd1@email.com',
    password: '123123',
    password2: '123'
  });

  const {name, email, password, password2} = formValues;

  const handleRegister = (event) => {
    event.preventDefault();
    if(isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  }

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(serError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(serError('Invalid email'));
      return false;
    }else if (password.length < 5) {
      dispatch(serError('Password should be at least 6 characters'));
      return false;
    }else if (password !== password2 || password.length < 5) {
      dispatch(serError('Passwords must match'));
      return false;
    }

    dispatch(removeError());
    return true;
  }

  return (
    <div>
      <h3 className="auth__title mb-5">RegisterScreen</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__bounce animate__fadeIn animate__faster"
        >

        {
          msgError && ( <div className="auth__alert-error"> {msgError} </div> )
        }

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          type="password"
          placeholder="Repeat Password"
          name="password2"
          className="auth__input"
          autoComplete="off"
          value={password2}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-primary btn-block mb-5"
          type="submit"
        >
          Register
        </button>
        <Link className="link" to="/auth/login">
          Already register?
        </Link>
      </form>
    </div>
  );
};

export default RegisterScreen;
