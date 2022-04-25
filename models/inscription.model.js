

module.exports = (sequelize, Sequelize) => {
  const Inscription = sequelize.define("inscriptions", {
    inscriptionId: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },    
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },      
    validated: {
      type: Sequelize.BOOLEAN,
      defaultValue : false
    },    
    bearer_token: {
      type: Sequelize.STRING,
      defaultValue : null
    },
    validation_date: {
      type: Sequelize.DATE,
      defaultValue : null
    }
  });

  return Inscription;
};
