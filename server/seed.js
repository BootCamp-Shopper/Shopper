const { db, Item, User, Address } = require('./db');
const superpowers = require("./superpowers")
const admin = require('./admin');
const address = require('./address');

const seed = async () => {
    try {
        await db.sync({force: true});

        await Promise.all(superpowers.map(superpower => Item.create({
            name: superpower.name,
            superhero: superpower.superhero,
            imageUrl: superpower.imageUrl,
            price: superpower.price,
            description: superpower.description
        })));

        // await Promise.all(admin.map(admin => User.create({
        //     firstName: admin.firstName,
        //     lastName: admin.lastName,
        //     imageUrl: admin.imageUrl,
        //     email: admin.email,
        //     password: admin.password,
        //     role: admin.role,
        // })));

        
        const users = [];
        for(let i=0;i<admin.length;i++) {
            const user = await User.create(admin[i]);
            users.push(user);
        }

        const addresses = await Address.bulkCreate(address, {returning: true});
        
        for(let i=0; i<users.length; i++) {
            // addresses[i].dataValues.userId = users[i].dataValues.id;
            await addresses[i].setUser(users[i]);
        };

        db.close();

        console.log(`
            SUPERPOWER SEEDING COMPLETE!
            NOW YOU CAN BUY ANY SUPERPOWER YOU WANT =)
        `)
    }
    catch(err) {
        console.log(err.message);
    }
};

module.exports = seed;

seed().catch(err => {
    db.close();
    console.log(`
        ERROR SEEDING:

        ${err.message}

        ${err.stack}
    `);
});