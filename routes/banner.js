const { chain, pick } = require("lodash")
const config = require("./../config")

module.exports = (app, model) => {
  app.get("/api/v1/banner", async (req, res) => {
    let list = []
    try {
      list = await model("Banner").find().sort({ ordering: 1 }).lean()
      list = chain(list)
        .map((t) => {
          let addOn = {}
          if (t.banner) {
            addOn = {
              ...addOn,
              banner: `${config.domain}${config.path.cms.path}/${t.banner.filename}`,
            }
          }
          return {
            ...pick(t, [
              "title",
              "linkto",
              "location",
              "_id",
              "publishDate",
              "ordering",
              "timestamp",
            ]),
            ...addOn,
          }
        })
        .value()
    } catch (err) {
      // ignore
    }
    return res.json(list)
  })
}
