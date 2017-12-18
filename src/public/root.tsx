import * as React from "react";
import { Router } from "react-router";
import { createHashHistory } from "history";
import Routes from "./routes";
import * as Axios from "axios";

const history = createHashHistory();

export default class Root extends React.Component {
  componentDidMount() {
    Axios.default.get("/auth/user").then(response => {
      if (response.data.user != null) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        localStorage.removeItem("user");
      }
      this.forceUpdate();
    });
  }

  render() {
    return (
      <Router history={history}>
        <Routes children={this.props.children} />
      </Router>
    );
  }
}
