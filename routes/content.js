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
        mt
      ] = await Promise.all([
        model('ContentBlock').find().sort({ ordering: 1 }).lean(),
        model('Menu').find().sort({ ordering: 1 }).lean(),
        model('mt').find().sort({ ordering: 1 }).lean(),
      ]);

      // normalization
      const classified = chain(block).groupBy('section').reduce((newClassifiedList, classifiedList, section) => {
        const list = chain(classifiedList).map(cl => pick(cl, [
          'title',
          'description',          
          'ordering',
        ])).sortBy(['ordering']).value();
        return {
          ...newClassifiedList,
          [section]: !!inspector[section] ? inspector[section](list) : list,
        }
      }, {}).value();
      // console.log(menu);

      const classified_metadata = chain(mt).groupBy('label').reduce((newClassifiedList, classifiedList, section) => {
        const list = chain(classifiedList).map(cl => pick(cl, [
          'label',
          'description',          
          'ordering',
        ])).sortBy(['ordering']).value();
        return {
          ...newClassifiedList,
          [section]: !!inspector[section] ? inspector[section](list) : list,
        }
      }, {}).value();

      const classified_menu = chain(menu).groupBy('section').reduce((newClassifiedList, classifiedList, section) => {
        const list = chain(classifiedList).map(cl => pick(cl, [
          'label',
          'url',          
          'ordering',
        ])).sortBy(['ordering']).value();
        return {
          ...newClassifiedList,
          [section]: !!inspector[section] ? inspector[section](list) : list,
        }
      }, {}).value();

      list = {
        // menu: chain(menu).map(m => pick(m, ['ordering', 'label','url'])).sortBy(['ordering']).value(),        
        ...classified_menu,...classified,...classified_metadata
      }
    } catch (err) {
      // ignore
      console.log(err);
    }
    return res.json(list);
  });

};
