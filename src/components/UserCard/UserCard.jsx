import React from "react";

import "./userCardStyles.scss";

const UserCard = (props) => {
  return <UserCardView {...props} />;
};

const UserCardView = (props) => {
  const { firstName, lastName, avatar, email } = props;
  return (
    <div className="card user-card">
      <div className="avatar-wrapper">
        <img
          src={avatar}
          className="card-img-top mx-auto user-avatar"
          alt={`${props.firstName}`}
        />
      </div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label className="text-sm" htmlFor="name">
              <small>Имя</small>
            </label>
            <input
              className="form-control"
              id="name"
              name="name"
              className="form-control form-control-sm"
              value={`${firstName} ${lastName}`}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              className="form-control form-control-sm"
              value={email}
            />
          </div>
        </form>
        <button type="button" className="btn btn-primary btn-sm">
          Редактировать
        </button>
      </div>
    </div>
  );
};

export default UserCard;
