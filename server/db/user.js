const Sequelize = require('sequelize');
// require('sequelize-isunique-validator')(Sequelize);
const db = require('./db');
const bcrypt = require('bcrypt');

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'default-user.jpg',
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { 
            isEmail: true,
            // isUnique: db.validateIsUnique(
            //     'email',
            //     'This email address already exists.'
            // )
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.ENUM('admin', 'member'),
        allowNull: false,
        defaultValue: 'member',
    },
},);

User.beforeCreate(async (user, options) => {
    user.password =  await bcrypt.hash(user.password, 10);
});

module.exports = User;