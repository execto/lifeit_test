import React from "react";

import "./userCardStyles.scss";
import { usersService } from "../../App";

const UserCard = React.memo((props) => {
  const { id, firstName, lastName, email, avatar, readonly } = props;

  const [userData, setUserData] = React.useState({
    name: `${firstName} ${lastName}`,
    email,
    avatar,
  });
  const [editing, setEditing] = React.useState(false);

  const handleInputChange = React.useCallback((event) => {
    const target = event.target;
    setUserData((prevData) => ({ ...prevData, [target.name]: target.value }));
  }, []);

  const handleButtonClick = React.useCallback((event) => {
    const btnName = event.target.name;
    switch (btnName) {
      case "edit":
        handleEditClick();
        break;
      case "cancel":
        handleCancelClick();
        break;
      case "delete":
        handleDeleteClick();
        break;
    }
  });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleDeleteClick = () => {
    usersService.deleteUser(id);
  };

  return (
    <UserCardView
      {...userData}
      onChage={handleInputChange}
      onClick={handleButtonClick}
      readonly={readonly}
      editing={editing}
    />
  );
});

UserCard.defaultProps = { readonly: false };

const UserCardView = (props) => {
  const { name, avatar, email, readonly, editing, onChage, onClick } = props;

  let buttons = null;
  if (!readonly) {
    buttons = (
      <div className="usercard-btns-wrapper">
        {!editing && (
          <>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onClick}
              name="edit"
            >
              Редактировать
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={onClick}
              name="delete"
            >
              Удалить
            </button>
          </>
        )}
        {editing && (
          <>
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={onClick}
              name="save"
            >
              Сохранить
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClick}
              name="cancel"
            >
              Отмена
            </button>
          </>
        )}
      </div>
    );
  }

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
              <small>Имя:</small>
            </label>
            <input
              className="form-control"
              id="name"
              name="name"
              className="form-control form-control-sm"
              value={name}
              onChange={onChage}
              readOnly={!editing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <small>Email:</small>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              className="form-control form-control-sm"
              value={email}
              onChange={onChage}
              readOnly={!editing}
            />
          </div>
        </form>
        {buttons}
      </div>
    </div>
  );
};

export default UserCard;
