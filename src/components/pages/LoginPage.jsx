import React from "react";
import { authService } from "../../App";

import "./loginPageStyles.scss";
import logo from "../../assets/logo.png";
import { Redirect } from "react-router-dom";
import AsyncButton from "../AsyncButton/AsyncButton";

const validateBeforeSend = (loginFormData) => {
  let message = "";
  if (!loginFormData.email && !loginFormData.password) {
    message = "Пожалуйста, введите email и пароль";
  } else if (!loginFormData.email) {
    message = "Пожалуйста, введите email";
  } else if (!loginFormData.password) {
    message = "Пожалуйста, введите пароль";
  }

  return message;
};

const LoginPage = () => {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loginError, setLoginError] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    authService.isAuthenticated
  );

  const handleInputChange = React.useCallback((event) => {
    setLoginError(null);
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const newValue = {
      [target.name]: value,
    };
    setLoginFormData((prevData) => ({ ...prevData, ...newValue }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationError = validateBeforeSend(loginFormData);
    if (validationError) {
      setLoginError(validationError);
      return;
    }

    const promise = authService.login(loginFormData);
    promise
      .then(() => setIsLoggedIn(true))
      .catch((err) => setLoginError(err.toString()));

    return () => promise;
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <LoginPageView
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      data={loginFormData}
      loginError={loginError}
    />
  );
};

const LoginPageView = (props) => {
  const { handleInputChange, handleSubmit, data, loginError } = props;
  return (
    <div className="container login-page">
      <div className="row align-items-center justify-content-center">
        <div className="col-sm-6">
          <div className="img-wrapper">
            <img src={logo} className="img-fluid" alt="logo" />
          </div>
        </div>
      </div>
      <div className="row align-items-center justify-content-center">
        <div className="col-sm-6">
          <div className="login-form">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={data.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={data.password || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember-me"
                  name="rememberMe"
                  checked={data.rememberMe || false}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="remember-me">
                  Запомнить меня
                </label>
              </div>
              {loginError && <p className="text-danger">{loginError}</p>}
              <AsyncButton title="Войти" action={handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
