const fs = require('fs');
const { db, Item, User, Address } = require('./db');
const superpowers = JSON.parse(fs.readFileSync('superpowers.json', 'utf8'));
const admin = JSON.parse(fs.readFileSync('admin.json', 'utf8'));
const address = JSON.parse(fs.readFileSync('address.json', 'utf8'));

const seed = async () => {
    await db.sync({ force: true });

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

    const users = await User.bulkCreate(admin, {returning: true});
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
};

seed().catch(err => {
    db.close();
    console.log(`
        ERROR SEEDING:

        ${err.message}

        ${err.stack}
    `);
});