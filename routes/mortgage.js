const { chain, pick } = require("lodash")
const moment = require("moment")
const config = require("../config")

module.exports = (app, model) => {
  moment.locale()
  app.post("/api/v1/mortgage", async (req, res) => {
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
        "propertyAddress",
        "propertyBlock",
        "propertyFloor",
        "propertyMethod",
        "propertyMortageState",
        "propertyRegion",
        "propertyUnit",
        "submissionDate",
      ])
      const applicationModel = model("MortgageSubmission")
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
