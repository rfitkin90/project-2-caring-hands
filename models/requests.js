module.exports = function (sequelize, DataTypes) {
   var Requests = sequelize.define("Requests", {
      availabilityStart: {
         type: DataTypes.STRING,
         allowNull: false
      },
      availabilityEnd: {
         type: DataTypes.STRING,
         allowNull: false
      },
      visitDuration: {
         type: DataTypes.INTEGER,
         defaultValue: 60
      },
      activityPreferences: {
         type: DataTypes.STRING
      },
      additionalInfo: {
         type: DataTypes.STRING
      },
      communityServiceForm: {
         type: DataTypes.BOOLEAN,
         allowNull: false
      }
   });

   Requests.associate = function (models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Requests.belongsTo(models.User, {
         foreignKey: {
            allowNull: false
         }
      });
   };
   return Requests;
}