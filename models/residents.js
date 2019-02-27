module.exports = function (sequelize, DataTypes) {
   var Residents = sequelize.define("Residents", {
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
      Residents.hasMany(models.Visits, {
         onDelete: "cascade"
      });
   };

   return Residents;
};