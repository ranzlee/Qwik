import { User } from "../../shared/models/user";
import * as Axios from "axios";
import * as React from "react";

export let syncUserOnMount = (component: React.Component) => {
  Axios.default.get<User>("/auth/user").then(response => {
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    } else {
      localStorage.removeItem("user");
    }
    component.forceUpdate();
  });
};

export let logout = () => {
  localStorage.removeItem("user");
  location.assign("/auth/logout");
};

export let getUser = (): User | null => {
  let u = localStorage.getItem("user");
  if (u != null) {
    return JSON.parse(u) as User;
  }
  return null;
};
