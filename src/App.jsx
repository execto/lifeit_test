import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import { ApiClient } from "./services/ApiClient";
import { AuthService } from "./services/AuthService";

export const apiClient = new ApiClient();
export const authService = new AuthService(apiClient);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/user-edit" />
        <Route exact path="/" />
      </Switch>
    </Router>
  );
};

export default App;
