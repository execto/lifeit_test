import React from "react";
import securePage from "../../hocs/securePage";
import Navbar from "../Navbar/Navbar";
import Page from "../Page/Page";
import NavLink from "../NavLink/NavLink";

const HomePage = () => {
  return (
    <Page>
      <Navbar>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/add-user">Добавить пользователя</NavLink>
      </Navbar>
    </Page>
  );
};

export default securePage(HomePage);
