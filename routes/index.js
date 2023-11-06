const cors = require("cors")
const bodyParser = require("body-parser")
const express = require("express")

const config = require("./../config")

const PostRoutes = require("./post")
const BannerRoutes = require("./banner")
const ContentRoutes = require("./content")
const VoluationRoutes = require("./valuation")
const ApplicationRoutes = require("./application")
const MortgageRoutes = require("./mortgage")
const CollateralRoutes = require("./collateral")

const crosOptions = config.CROS || {
  origin: true,
  credentials: true,
}

module.exports = (keystone, app) => {
  app.use(config.staticPath, express.static(config.uploadPath))
  app.use(cors(crosOptions))
  // app.use(compression());
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  const model = (listKey) => keystone.lists[listKey].adapter.model

  PostRoutes(app, model)
  BannerRoutes(app, model)
  ApplicationRoutes(app, model)
  VoluationRoutes(app, model)
  MortgageRoutes(app, model)
  CollateralRoutes(app, model)
  ContentRoutes(app, model)
}
