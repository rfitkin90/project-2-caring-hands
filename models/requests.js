var Requests = sequelize.define("Requests", {
   availabilityStart: {
      type: DataTypes.TIME,
      allowNull: false
   },
   availabilityEnd: {
      type: DataTypes.TIME,
      allowNull: false
   },
   visitDuration: {
      type: DataTypes.INT,
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
   Requests.belongsTo(models.UserModel, {
      foreignKey: {
         allowNull: false
      }
   });
};