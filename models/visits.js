module.exports = function (sequelize, DataTypes) {
   var Visits = sequelize.define("Visits", {
      visitStart: {
         type: DataTypes.TIME,
         allowNull: false
      },
      visitEnd: {
         type: DataTypes.TIME,
         allowNull: false
      },
      visitDuration: {
         type: DataTypes.INT,
         defaultValue: 60
      },
      activities: {
         type: DataTypes.STRING
      },
      communityServiceForm: {
         type: DataTypes.BOOLEAN,
         allowNull: false
      },
      confirmed: {
         type: DataTypes.BOOLEAN,
         allowNull: false
      }
   });

   Visits.associate = function (models) {
      Visits.belongsToMany(models.UserModel, {
         foreignKey: {
            allowNull: false
         }
      });
      Visits.belongsToMany(models.Residents, {
         foreignKey: {
            allowNull: false
         }
      });
   };

   return Visits;
};