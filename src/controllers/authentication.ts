import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import { Response, Request, NextFunction } from "express";
import * as passport from "passport";

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

export let getUser = (req: Request, res: Response) => {
  if (req.user) {
    res.send({ user: { name: req.user.profile.name, claims: [] } });
  } else {
    res.send({ user: null });
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
