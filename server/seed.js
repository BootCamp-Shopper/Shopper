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

    //const user = admin.map(admin => admin.email);

    const kat = await User.create ({
        firstName: "Kat",
        lastName: "Kim",
        imageUrl: "https://www.flexdata.com.au/wp-content/uploads/2015/02/default_avatar_female.jpg",
        email: "katkim0307@gmail.com",
        password: "1234",
        role: "admin"
    })

    console.log(kat);
    // await Promise.all(address.map(address => Address.create({
    //     line1: address.line1,
    //     line2: address.line2,
    //     city: address.city,
    //     state: address.state,
    //     zip: address.zip,
    //     userId: kat.dataValues.id,
    // })));

    await Promise.resolve(Address.create({
            line1: address[0].line1,
            line2: address[0].line2,
            city: address[0].city,
            state: address[0].state,
            zip: address[0].zip,
            userId: kat.dataValues.id,
        })
    );

    // const promiseUser = admin.setAddress(adderess);
    // const promiseAddress = address.setAdmin

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