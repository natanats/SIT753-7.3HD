const { DatabaseSync } = require("node:sqlite");

let db;

try {

    db = new DatabaseSync("techzone.db");

    // CONTACTS

    const stmt = db.prepare(

        "SELECT * FROM contacts"
    );

    const contacts = stmt.all();

    if (contacts.length === 0) {

        console.log("No records found");

    } else {

        console.table("Contacts table contents:");

        console.table(contacts);
    }


    // USERS

    const users = db.prepare(

        "SELECT * FROM users"
    );

    const customers = users.all();

    console.log(
        "\nUsers table contents:"
    );

    console.table(customers);

} catch (err) {

    console.error(
        "Failed to read database:",
        err.message
    );

    process.exit(1);
}