const Sequelize = require('Sequelize') //the api we're using for our database
const db = require('./db') //our actual database; change reference route in parentheses if the database js file is named differently


//the items model

const item = db.define('items', {
	name: {
        type: Sequelize.STRING, // name of item is going to be input as a text string.
        allowNull: FALSE // no null values for these attributes!!
		},

	price: {
        type: Sequelize.INTEGER, // price represented as integer value
        allowNull: FALSE // no null values for these attributes!!
        },

    description: {
        type: Sequelize.TEXT, // descriptions of items require strings that are greater than 256 characters, hence "TEXT"
        allowNull: FALSE // no null values for these attributes!!
    },
    
    imageUrl: {
        type: Sequelize.STRING, //
        defaultValue: "default_image.jpg", //the default image in the general model.
        allowNull: FALSE // no null values for these attributes!!
    }

})

module.export = item;