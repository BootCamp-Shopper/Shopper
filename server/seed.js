const fs = require('fs');
const {db, Item, User} = require('./db');
const superpowers = JSON.parse(fs.readFileSync('superpowers.json', 'utf8'));
const admin = JSON.parse(fs.readFileSync('admin.json', 'utf8'));

const seed = async() => {
    await db.sync({force: true});

    await Promise.all(superpowers.map(superpower => Item.create ({
        name: superpower.name,
        superhero: superpower.superhero,
        imageUrl: superpower.imageUrl,
        price: superpower.price,
        description: superpower.description
    })));

    await Promise.all(admin.map(admin => User.create ({
        firstName: admin.firstName,
        lastName: admin.lastName,
        imageUrl: admin.imageUrl,
        address: admin.address,
        email: admin.email,
        password: admin.password,
        role: admin.role,
    })));

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