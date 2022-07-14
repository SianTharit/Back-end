const { sequelize } = require("./models");

const seedData = async () => {
   try {
      await sequelize.sync({ force: true });
   } catch (err) {
      console.log(err);
   }
};

seedData();
