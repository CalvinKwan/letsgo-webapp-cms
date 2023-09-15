const { chain, pick } = require("lodash")
const moment = require("moment")
const config = require("../config")

module.exports = (app, model) => {
  moment.locale()
  app.post("/api/v1/collateral", async (req, res) => {
    let submission = {}
    try {
      const body = req.body
      console.log(req)
      const data = pick(body, [
        "loanTarget",
        "phoneNumb",
        "fullName",
        "idCard",
        "birthDate",
        "sex",
        "amount",
        "occupation",
        "timestamp",
        "paymentTerms",
        "liveAddress",
        "liveBlock",
        "liveFloor",
        "liveMethod",
        "liveRegion",
        "liveUnit",
        "carType",
        "carBrand",
        "carBrandFactory",
        "carColor",
        "carMile",
        "carFirstMile",
        "carLuxInfo",
        "carModel",
        "carTypeMode",
        "carYear",
        "submissionDate",
      ])
      const applicationModel = model("CollateralSubmission")
      submission = await new applicationModel({
        ...data,
        submissionDate: moment().format("YYYY-MM-DD"),
      }).save()
    } catch (err) {
      console.log(err)
      // ignore
    }
    return res.json(submission)
  })
}
