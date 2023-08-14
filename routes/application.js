const { chain, pick } = require("lodash")
const moment = require("moment")
const config = require("../config")

module.exports = (app, model) => {
  moment.locale()
  app.post("/api/v1/application", async (req, res) => {
    let submission = {}
    try {
      const body = req.body
      console.log(req)
      const data = pick(body, [
        "companyAddress",
        "companyName",
        "companyPhone",
        "employment",
        "industry",
        "liveAddress",
        "liveBlock",
        "liveFloor",
        "liveMethod",
        "liveRegion",
        "liveUnit",
        "loanTarget",
        "nationality",
        "paymentTerms",
        "position",
        "phoneNumb",
        "fullName",
        "idCard",
        "birthDate",
        "sex",
        "amount",
        "occupation",
        "payMethod",
        "income",
        "propertyAddress",
        "propertyBlock",
        "propertyFloor",
        "propertyMethod",
        "propertyMortageState",
        "propertyRegion",
        "propertyUnit",
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
        "timestamp",
      ])
      const applicationModel = model("ApplicationSubmission")
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
