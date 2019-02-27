module.exports = function (sequelize, DataTypes) {
   var Residents = sequelize.define("Residents", {
      // Giving the Author model a name of type STRING
      firstName: {
         type: DataTypes.STRING,
         allowNull: false
      },
      age: {
         type: DataTypes.INT
      },
      additionalnfo: {
         type: DataTypes.STRING
      },
      activityPreferences: {
         type: DataTypes.STRING
      }
   });

   Residents.associate = function (models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Residents.hasMany(models.Visits, {
         onDelete: "cascade"
      });
   };

   return Residents;
};