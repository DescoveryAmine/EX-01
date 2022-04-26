const config = require("../config/keys.js");

const Sequelize = require("sequelize");

// B-DB ConfIg
//const db = require('./config/keys').mongoURI;
const sequelize = new Sequelize(config.PostgresURI) // 
sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
});

// Example for postgres

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/user.model.js")(sequelize, Sequelize);
db.Inscription = require("../models/inscription.model.js")(sequelize, Sequelize);


db.User.belongsToMany(db.Inscription, {
  through: "user_inscriptions",
  foreignKey: "userId",
  otherKey: "inscriptionId"
});

module.exports = db;
