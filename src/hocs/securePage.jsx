import React from "react";
import { authService, apiClient } from "../App";
import { Redirect } from "react-router-dom";

const securePage = (WrappedComponent) => {
  return () => {
    if (!authService.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return <WrappedComponent />;
  };
};

export default securePage;
