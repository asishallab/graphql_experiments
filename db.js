const Sequelize = require('sequelize')

// Init test Database using SQLite:
module.exports.sequelize = new Sequelize(
  'graphql_development',
  'graphql', 'graphql', {
    host: 'graphql_db',
    dialect: 'postgres',
    port: '5432'
  });

// Define test Data Model
module.exports.Klingon = module.exports.sequelize.define('klingon', {
  petach: Sequelize.STRING,
  birthday: Sequelize.DATE,
  friend_id: Sequelize.INTEGER
})
module.exports.Klingon.belongsTo(module.exports.Klingon, {
  as: 'friend',
  foreignKey: 'friend_id'
});
module.exports.Klingon.hasMany(module.exports.Klingon, {
  as: 'warriors',
  foreignKey: 'friend_id'
});
module.exports.Klingon.prototype.myFriend = function() {
  return this.friend
}
// CRUD experiment
module.exports.DbCrud = module.exports.sequelize.define('crud', {
  name: Sequelize.STRING
})

