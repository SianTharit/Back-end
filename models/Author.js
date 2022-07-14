module.exports = (sequelize, DataTypes) => {
   const Author = sequelize.define(
      "Author",
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         gender: {
            type: DataTypes.ENUM("male", "female"),
            allowNull: false,
         },
      },
      {
         underscored: true,
         timestamps: true,
      }
   );

   Author.associate = (models) => {
      Author.hasMany(models.Book, {
         as: "author",
         foreignKey: {
            name: "authorId",
            allowNull: false,
         },
         onUpdate: "CASCADE",
         onDelete: "CASCADE",
      });
   };
   return Author;
};
