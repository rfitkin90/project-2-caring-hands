module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            required: true,
            validate: {
                isEmail: true
            }
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        role: {
            type: DataTypes.STRING,
            default: 'visitor'
        },
        salt: DataTypes.STRING,
        hash: DataTypes.STRING
    });

    User.associate = function (models) {
        User.hasMany(models.Requests, {
            onDelete: "cascade"
        });
    };

    User.associate = function (models) {
        User.hasMany(models.Visits, {
            onDelete: "cascade"
        });
    };

    return User;
};