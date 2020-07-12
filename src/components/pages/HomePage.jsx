import React from "react";
import securePage from "../../hocs/securePage";
import Navbar from "../Navbar/Navbar";
import Page from "../Page/Page";
import NavLink from "../NavLink/NavLink";
import { useCancelableFetch } from "../../hooks/useCancelableFetch";
import { usersService } from "../../App";
import UserCard from "../UserCard/UserCard";

const HomePage = () => {
  const [listUsers, setListUsers] = React.useState();

  React.useEffect(() => {
    usersService.loadUsers("/users").then((res) => {
      const curPage = res.page;
      const nextPage = res.total_pages > curPage ? curPage + 1 : curPage;
      const users = res.data;
      setListUsers({
        curPage,
        nextPage,
        users,
      });
    });
  }, []);

  return (
    <Page>
      <Navbar>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/add-user">Добавить пользователя</NavLink>
      </Navbar>
      <div className="container">
        <div className="row d-flex flex-sm-column align-items-sm-center justify-content-sm-between">
          {listUsers &&
            listUsers.users.map((user) => {
              return (
                <div key={user.id} className="col-sm-6 mb-3">
                  <UserCard
                    firstName={user.first_name}
                    lastName={user.last_name}
                    email={user.email}
                    avatar={user.avatar}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </Page>
  );
};

export default securePage(HomePage);
