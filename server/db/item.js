const Sequelize = require('sequelize');
const db = require('./db');

const Item = db.define('item', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    superhero: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'default-item.png',
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
});

module.exports = Item;