module.exports = function (sequelize, DataTypes) {
   var Residents = sequelize.define("Residents", {
      firstName: {
         type: DataTypes.STRING,
         allowNull: false
      },
      age: {
         type: DataTypes.INT
      },
      activityPreferences: {
         type: DataTypes.STRING
      },
      additionalnfo: {
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