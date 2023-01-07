require('dotenv').config();
const config = require("config");
const path = require("path");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const i18n = require("i18n");
const helmet = require("helmet");



class appConfiguration {
  app;

  constructor(app) {
    this.app = app;
    this.engine();
    this.http();
    this.i18n();
  }

  engine() {

    this.app.use(helmet());
    this.app.use(express.static("public"));
    this.app.use('/resources',express.static(__dirname + '/images'));
    this.app.set("view engine", "ejs");
    this.app.use(expressLayouts);
    this.app.set("layout extractScripts", true);
    this.app.set("views", path.resolve("./resource/views"));
    this.app.set("layout", "master");

  }

  http() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  i18n() {
    i18n.configure({
      locales: ["en", "fa"],
      directory: config.layout.locales_directory,
      defaultLocale: "fa",
      cookie: "lang",
      objectNotation: true,
    });

    app.use(i18n.init);
  }

 
}

module.exports = appConfiguration;
