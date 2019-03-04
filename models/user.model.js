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
    return User;
};