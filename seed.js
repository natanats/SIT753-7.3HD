const { DatabaseSync } = require("node:sqlite");

const sampleContacts = [

    {
        name: "John",
        surname: "Smith",
        email: "john@email.com",
        phone: "0412345678",
        topic: "Product",
        message: "I like this website"
    },

    {
        name: "Sarah",
        surname: "Brown",
        email: "sarah@email.com",
        phone: "0498765432",
        topic: "Support",
        message: "Need help with my order"
    }
];

let db;

try {

    db = new DatabaseSync("techzone.db");

    db.exec("DELETE FROM contacts");

    const stmt = db.prepare(`

    INSERT INTO contacts

    (
        name,
        surname,
        email,
        phone,
        topic,
        message
    )

    VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const contact of sampleContacts) {

        stmt.run(

            contact.name,
            contact.surname,
            contact.email,
            contact.phone,
            contact.topic,
            contact.message
        );
    }

    console.log(
        "Database seeded with sample contacts."
    );

} catch (err) {

    console.error(
        "Failed to seed database:",
        err.message
    );

    process.exit(1);
}