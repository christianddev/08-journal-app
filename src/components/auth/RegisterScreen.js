import React from "react";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  return (
    <div>
      <h3 className="auth__title mb-5">RegisterScreen</h3>
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Repeat Password"
          name="password2"
          className="auth__input"
          autoComplete="off"
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
