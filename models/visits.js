module.exports = function (sequelize, DataTypes) {
   var Visits = sequelize.define("Visits", {
      visitStart: {
         type: DataTypes.STRING,
         allowNull: false
      },
      visitEnd: {
         type: DataTypes.STRING,
         allowNull: false
      },
      activity: {
         type: DataTypes.STRING
      },
      communityServiceForm: {
         type: DataTypes.BOOLEAN,
         allowNull: false
      },
      emailConfirmKey: {
         type: DataTypes.STRING,
         allowNull: false
      },
      confirmed: {
         type: DataTypes.BOOLEAN,
         allowNull: false
      }
   });

   Visits.associate = function (models) {
      Visits.belongsTo(models.User, {
         foreignKey: {
            allowNull: false
         }
      });
      Visits.belongsTo(models.Residents, {
         foreignKey: {
            allowNull: false
         }
      });
   };

   return Visits;
};