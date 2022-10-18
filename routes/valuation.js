const { chain, pick } = require("lodash")
const moment = require("moment")
const config = require("../config")

module.exports = (app, model) => {
  moment.locale()
  app.post("/api/v1/valuation", async (req, res) => {
    let submission = {}
    try {
      const body = req.body
      console.log(req)
      const data = pick(body, [
        "name",
        "phone",
        "byWhatsapp",
        "byPhone",
        "address",
        "agreeTerms1",
        "agreeTerms2",
        "rate",
        "amount",
        "installment",
        "paymentPeriod",
        "timestamp",
      ])
      const valuationModel = model("ValuationSubmission")
      submission = await new valuationModel({
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
