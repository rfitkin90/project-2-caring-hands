// CREATE TABLE requests (
//    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
//    availabilityStart TIMESTAMP NOT NULL,
//    availabilityEnd TIMESTAMP NOT NULL,
//    activities TEXT,
//    additionalInfo TEXT,
//    communityServiceFormRequest BOOLEAN NOT NULL,
//    usersId INT NOT NULL,
// );

module.exports = function (sequelize, DataTypes) {
   var Residents = sequelize.define("Residents", {
      // Giving the Author model a name of type STRING
      availabilityStart: {
         type: DataTypes.TIME,
         allowNull: false
      },
      availabilityEnd: {
         type: DataTypes.TIME,
         allowNull: false
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

   Residents.associate = function (models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Residents.hasMany(models.Visits, {
         onDelete: "cascade"
      });
   };

   return Residents;
};