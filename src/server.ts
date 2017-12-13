import * as express from "express";
import * as compression from "compression"; // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as mongo from "connect-mongo";
import * as flash from "express-flash";
import * as path from "path";
import * as mongoose from "mongoose";
import * as passport from "passport";
import expressValidator = require("express-validator");
import * as passportConfig from "./config/passport";

const MongoStore = mongo(session);

dotenv.config({ path: path.join(__dirname, ".env.config") });

const app = express();

const connectionUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || "";

console.log("Mongo connection URI: " + connectionUri);

mongoose.connect(connectionUri);

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  console.log(
    "development mode - using webpack-dev-middleware with HMR enabled"
  );
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const config = require("../webpack.dev.js");
  const compiler = webpack(config);
  // Tell express to use the webpack-dev-middleware and use the webpack.dev.js configuration file as a base.
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
  app.use(errorHandler());
}

app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "",
    store: new MongoStore({
      url: connectionUri,
      autoReconnect: true
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (
    req.session &&
    !req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)
  ) {
    req.session.returnTo = req.path;
  } else if (req.session && req.user && req.path == "/account") {
    req.session.returnTo = req.path;
  }
  next();
});

var options = {
  index: "index.html",
  maxAge: 31557600000
};

app.use("/", express.static(path.join(__dirname, "public"), options));

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
