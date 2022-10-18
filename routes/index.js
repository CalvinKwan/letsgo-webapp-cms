const cors = require("cors")
const bodyParser = require("body-parser")
const express = require("express")

const config = require("./../config")

const PostRoutes = require("./post")
const ContentRoutes = require("./content")
const VoluationRoutes = require("./valuation")
const ApplicationRoutes = require("./application")

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
  ApplicationRoutes(app, model)
  VoluationRoutes(app, model)
  ContentRoutes(app, model)
}
