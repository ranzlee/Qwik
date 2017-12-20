import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import { Response, Request, NextFunction } from "express";
import * as passport from "passport";
import { User } from "../shared/models/user";

export let redirectRootIfAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
};

export let getUser = (req: Request, res: Response): User | void => {
  if (req.user) {
    var u = new User();
    u.name = req.user.profile.name;
    res.send(u);
  } else {
    res.send();
  }
};

export let logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect("/");
};

export let authenticateFacebook = () => {
  return passport.authenticate("facebook", {
    scope: ["email", "public_profile"]
  });
};

export let authenticateFacebookCallback = () => {
  return (
    passport.authenticate("facebook"),
    (req: Request, res: Response) => {
      if (req.session) {
        res.redirect("/#/home");
      }
    }
  );
};

export let authenticateGoogle = () => {
  return passport.authenticate("google", {
    scope: ["email", "profile"]
  });
};

export let authenticateGoogleCallback = () => {
  return (
    passport.authenticate("google"),
    (req: Request, res: Response) => {
      if (req.session) {
        res.redirect("/#/home");
      }
    }
  );
};
