import * as passport from "passport";
import * as passportFacebook from "passport-facebook";
import { default as User } from "../models/User";
import { Request, Response, NextFunction, Express } from "express";

const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser<any, any>((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in with Facebook.
 */
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
      callbackURL: "/auth/facebook/callback",
      profileFields: ["name", "email", "link", "locale", "timezone"],
      passReqToCallback: true
    },
    (req: Request, accessToken, refreshToken, profile, done) => {
      User.findOne({ facebook: profile.id }, (err, existingUser) => {
        if (err) {
          return done(err);
        }
        if (existingUser) {
          return done(undefined, existingUser);
        }
        User.findOne(
          { email: profile._json.email },
          (err, existingEmailUser) => {
            if (err) {
              return done(err);
            }
            if (existingEmailUser) {
              done(err);
            } else {
              const user: any = new User();
              user.email = profile._json.email;
              user.facebook = profile.id;
              user.tokens.push({ kind: "facebook", accessToken });
              user.profile.name =
                profile && profile.name
                  ? `${profile.name.givenName} ${profile.name.familyName}`
                  : "";
              user.profile.gender = profile._json.gender;
              user.profile.picture = `https://graph.facebook.com/${
                profile.id
              }/picture?type=large`;
              user.profile.location = profile._json.location
                ? profile._json.location.name
                : "";
              user.save((err: Error) => {
                done(err, user);
              });
            }
          }
        );
      });
    }
  )
);
