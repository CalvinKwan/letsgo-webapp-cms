const DB_NAME = "richmorecms"

// basic application setting
const setting = {
  env: "localhost",
  domain: process.env.DOMAIN || "http://localhost:3000",
  appName: "Richmore Financial",
  cookieSecret:
    "u#G9vmhTw2EDm8_=+NZ=G+7#KjzUsu2-Dz-G5ybhdCNLj#@vfG2gjtX7pY@7afw$Dk&d4DDEsCv__dr+QZaV$8nY&AmekRexy%ZLaaFwumzMz_mqwgM^^5!Fm+8KV_-m",
  dbName: DB_NAME,
  dev: true,
  port: process.env.PORT || 3000,
  adapter: {
    // mongoUri: process.env.MONGO_URL || `mongodb://localhost/${DB_NAME}`,
    mongoUri:
      "mongodb+srv://rmuser:rm123456@cluster0.f1h0j.mongodb.net/richmorecms?retryWrites=true&w=majority",
  },
  staticPath: "/file",
  uploadPath: "public",
  path: {
    cms: {
      src: "./public/uploads/cms",
      path: "/file/uploads/cms",
    },
  },
}

const developmentSetting = {
  ...setting,
  env: "development",
  domain: "http://34.81.228.6/",
}

const betaSetting = {
  ...setting,
  env: "beta",
  dev: false,
  domain: "http://34.81.228.6/",
}

const uatSetting = {
  ...setting,
  env: "uat",
  dev: false,
  domain: "http://34.81.228.6/",
}

const productionSetting = {
  ...setting,
  env: "production",
  dev: false,
  domain: "https://backend.rmloan.com.hk/",
}

let config
const {
  env: { NODE_ENV },
} = process
switch (NODE_ENV) {
  case "development":
    config = developmentSetting
    break
  case "beta":
    config = betaSetting
    break
  case "production":
    config = productionSetting
    break
  case "uat":
    config = uatSetting
    break
  default:
    config = setting
}

module.exports = config
