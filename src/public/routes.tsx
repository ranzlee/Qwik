import * as React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import * as UserService from "./services/userService";

export default class Routes extends React.Component {
  logout = (event: any) => {
    event.preventDefault();
    UserService.logout();
  };

  render() {
    let authLink = null;
    if (UserService.getUser() != null) {
      authLink = <NavItem onClick={this.logout}>LOGOUT</NavItem>;
    } else {
      authLink = (
        <LinkContainer to="/login">
          <NavItem eventKey={1}>LOGIN</NavItem>
        </LinkContainer>
      );
    }

    return (
      <div>
        <Navbar fluid fixedTop collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">QWIK</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/home">
                <NavItem eventKey={2}>HOME</NavItem>
              </LinkContainer>
              <LinkContainer to="/about">
                <NavItem eventKey={3}>ABOUT</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>{authLink}</Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route exact path="/" component={App} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}
