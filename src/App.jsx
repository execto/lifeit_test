import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import { ApiClient } from "./services/ApiClient";
import { AuthService } from "./services/AuthService";
import HomePage from "./components/pages/HomePage";

export const apiClient = new ApiClient();
export const authService = new AuthService(apiClient);
console.log("APP");

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/user-edit" />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
