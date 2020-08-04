const db = require('./db');
const Sequelize = require('sequelize')
const User = require('./user');
const Item = require('./item');
const Address = require('./address');

// models: Items, User, and Order junction table 

const Order = db.define('Order', {
    status: {
        type: Sequelize.ENUM('pending', 'fulfilled')
    }
});
User.belongsToMany(Item, { through: Order });
Item.belongsToMany(User, { through: Order });
User.hasMany(Address);
Address.belongsTo(User);

module.exports = { User, Item, db, Order, Address }