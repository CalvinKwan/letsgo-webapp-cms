const { chain, pick } = require("lodash")
const config = require("./../config")

module.exports = (app, model) => {
  app.get("/api/v1/post", async (req, res) => {
    let list = []
    try {
      list = await model("Post").find().sort({ ordering: 1 }).lean()
      list = chain(list)
        .map((t) => {
          let addOn = {}
          if (t.thumbnail) {
            addOn = {
              thumbnail: `${config.domain}${config.path.cms.path}/${t.thumbnail.filename}`,
            }
          }
          if (t.banner) {
            addOn = {
              ...addOn,
              banner: `${config.domain}${config.path.cms.path}/${t.banner.filename}`,
            }
          }
          return {
            ...pick(t, [
              "title",
              "category",
              "content",
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
