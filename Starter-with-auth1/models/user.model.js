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
        name: DataTypes.STRING,
        //hexadecimal numbers
        salt: DataTypes.STRING,
        //binary numbers
        hash: DataTypes.STRING
    });
    return User;
};
