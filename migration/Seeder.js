const { createItems } = require('@keystonejs/server-side-graphql-client');

class Seeder {
  constructor() {
    this.seeds = [];
  }

  async seed(listKey, data, match = {}) {
    const { model } = this.keystone.lists[listKey].adapter;
    const c = await model.countDocuments(match);

    if (!c) {
      await createItems({
        keystone: this.keystone,
        listKey,
        items: data,
      });
    }
  }

  push(...args) {
    this.seeds.push(args);
  }

  async run(keystone) {
    this.keystone = keystone;
    const { model: SettingModel } = this.keystone.lists['SystemSetting'].adapter;
    const initialized = await SettingModel.findOne({ key: 'initialSystem' });
    if (!initialized) {
      return Promise.all(this.seeds.map((s) => this.seed(...s)));
    }

    return null;
  }
}

module.exports = Seeder;
