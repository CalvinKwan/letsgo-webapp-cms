const { chain, pick, head } = require('lodash');

const inspector = {
  aboutus: v => head(v),
  valuation: v => head(v), 
}

module.exports = (app, model) => {
  app.get('/api/v1/content', async (req, res) => {
    let list = {};
    try {
      // fetch data parallel
      const [
        block,
        menu,
        cards,
        LoanServicePage,
        MT
      ] = await Promise.all([
        model('Block').find().sort({ ordering: 1 }).lean(),
        model('Menu').find().sort({ ordering: 1 }).lean(),
        model('Card').find().sort({ ordering: 1 }).lean(),
        model('LoanServicePage').find().sort({ ordering: 1 }).lean(),
        model('MT').find().sort({ ordering: 1 }).lean(),
      ]);

      // normalization
      const classified = chain(block).groupBy('section').reduce((newClassifiedList, classifiedList, section) => {
        const list = chain(classifiedList).map(cl => pick(cl, [
          'title',
          'description',
          'metaTitle',
          'metaDescription',
          'metaKeywords',
          'ordering',
        ])).sortBy(['ordering']).value();
        return {
          ...newClassifiedList,
          [section]: !!inspector[section] ? inspector[section](list) : list,
        }
      }, {}).value();
      // console.log(menu);
      list = {
        menu: chain(menu).map(m => pick(m, ['ordering', 'label'])).sortBy(['ordering']).value(),
        richMore: chain(cards).map(c => pick(c, ['ordering', 'label', 'description'])).sortBy(['ordering']).value(),
        LoanServicePage: chain(LoanServicePage).map(c => pick(c, ['ordering', 'label', 'description'])).sortBy(['ordering']).value(),
        MT: chain(MT).map(c => pick(c, ['title', 'description', 'metaTitle','metaDescription','metaKeywords','ordering'])).sortBy(['ordering']).value(),
        ...classified,
      }
    } catch (err) {
      // ignore
      console.log(err);
    }
    return res.json(list);
  });

};
