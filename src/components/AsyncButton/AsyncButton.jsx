import React from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";

const AsyncButton = ({ title, action }) => {
  const [inAction, setInAction] = React.useState(false);

  const handleClick = (event) => {
    const actionRes = action(event);
    if (typeof actionRes !== "function") {
      return;
    }

    setInAction(true);
    return actionRes().catch(() => setInAction(false));
  };

  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      onClick={handleClick}
    >
      {inAction ? <Spinner /> : title}
    </button>
  );
};

AsyncButton.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
};

export default AsyncButton;
