import React from "react";
import { authService } from "../../App";

import "./loginPageStyles.scss";
import logo from "../../assets/logo.png";

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
  const [loginFormData, setLoginFormData] = React.useState({});
  const [validationError, setValidationError] = React.useState();

  const handleInputChange = React.useCallback((event) => {
    setValidationError(null);
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const newValue = {
      [target.name]: value,
    };
    setLoginFormData((prevData) => ({ ...prevData, ...newValue }));
  });

  const handleSubmit = React.useCallback((event) => {
    event.preventDefault();

    const validationError = validateBeforeSend(loginFormData);
    if (validationError) {
      setValidationError(validationError);
      return;
    }

    authService.login("eve.holt@reqres.in", "ciatyslicka").then(console.log);
  });

  return (
    <LoginPageView
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      data={loginFormData}
      validationError={validationError}
    />
  );
};

const LoginPageView = (props) => {
  const { handleInputChange, handleSubmit, data, validationError } = props;

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
                  Запомнить
                </label>
              </div>
              {validationError && (
                <p className="text-danger">{validationError}</p>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
