import * as React from "react";
import { Router } from "react-router";
import { createHashHistory } from "history";
import Routes from "./routes";
import * as Axios from "axios";
import * as UserService from "./services/userService";

const history = createHashHistory();

export default class Root extends React.Component {
  componentDidMount() {
    UserService.syncUserOnMount(this);
  }

  render() {
    return (
      <Router history={history}>
        <Routes children={this.props.children} />
      </Router>
    );
  }
}
