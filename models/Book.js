module.exports = (sequelize, DataTypes) => {
   const Book = sequelize.define(
      "Book",
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         genre: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         underscored: true,
         timestamps: true,
      }
   );

   Book.associate = (models) => {
      Book.belongsTo(models.Author, {
         as: "author",
         foreignKey: {
            name: "authorId",
            allowNull: false,
         },
         onUpdate: "CASCADE",
         onDelete: "CASCADE",
      });
   };
   return Book;
};
