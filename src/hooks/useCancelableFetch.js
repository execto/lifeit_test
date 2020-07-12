import React from "react";

export const useCancelableFetch = (request, onSuccess, onError, deps) => {
  const controller = new AbortController();
  const signal = controller.signal;

  React.useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);
};
