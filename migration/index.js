const Seeder = require('./Seeder');
const block = require('./block');
const user = require('./user');
const card = require('./card');
const loanservicepage = require('./loanservicepage');
const mtadata = require('./mtadata');
const menu = require('./menu');
const setting = require('./setting');
const post = require('./post');
const seeder = new Seeder();

seeder.push('User', user, { preDefined: true });
seeder.push('Block', block);
seeder.push('Card', card);
seeder.push('LoanServicePage', loanservicepage);
seeder.push('MtaData', mtadata);
seeder.push('Menu', menu);
seeder.push('SystemSetting', setting);
seeder.push('Post', post);

module.exports = keystone => seeder.run(keystone);
