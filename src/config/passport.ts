import * as passport from "passport";
import * as passportFacebook from "passport-facebook";
import * as passportGoogle from "passport-google-oauth";
import { default as User } from "../models/User";
import { Request, Response, NextFunction, Express } from "express";
import * as linq from "linq";

const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

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
            const user: any =
              existingEmailUser == null ? new User() : existingEmailUser;
            user.email = profile._json.email;
            user.facebook = profile.id;
            let token = linq
              .from(user.tokens)
              .firstOrDefault(x => (x as any).kind === "facebook");
            if (token) {
              (token as any).accessToken = accessToken;
            } else {
              user.tokens.push({ kind: "facebook", accessToken });
            }
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
        );
      });
    }
  )
);

/**
 * Sign in with Google.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      callbackURL: "/auth/google/callback",
      passReqToCallback: true
    },
    function(req: Request, accessToken, refreshToken, profile, done) {
      User.findOne({ google: profile.id }, function(err, existingUser) {
        if (err) {
          return done(err);
        }
        if (existingUser) {
          return done(undefined, existingUser);
        }
        let googleProfile = linq
          .from(profile.emails)
          .firstOrDefault(x => (x as any).type === "account");
        if (!googleProfile) {
          return done(undefined);
        }
        User.findOne(
          {
            email: googleProfile.value
          },
          (err, existingEmailUser) => {
            if (err) {
              return done(err);
            }
            const user: any =
              existingEmailUser == null ? new User() : existingEmailUser;
            user.email = googleProfile.value;
            user.google = profile.id;
            let token = linq
              .from(user.tokens)
              .firstOrDefault(x => (x as any).kind === "google");
            if (token) {
              (token as any).accessToken = accessToken;
            } else {
              user.tokens.push({
                kind: "google",
                accessToken
              });
            }
            user.profile.name = profile.displayName;
            user.profile.gender = profile.gender;
            user.profile.picture = profile._json.image.url;
            user.save((err: Error) => {
              done(err, user);
            });
          }
        );
      });
    }
  )
);
