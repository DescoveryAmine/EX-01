module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    userId: {
      type: Sequelize.INTEGER
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};
