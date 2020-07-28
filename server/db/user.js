const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'default-user.jpg',
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        validate: { isEmail: true },
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = User;