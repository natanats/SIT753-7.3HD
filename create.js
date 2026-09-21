const { DatabaseSync } = require("node:sqlite");

let db;

try {

    db = new DatabaseSync("techzone.db");

    db.exec(`

    CREATE TABLE IF NOT EXISTS contacts (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        surname TEXT NOT NULL,

        email TEXT NOT NULL,

        phone TEXT NOT NULL,

        topic TEXT NOT NULL,

        message TEXT NOT NULL
    )
    `);

    console.log("Contacts table ready.");

} catch (err) {

    console.error(
        "Database initialisation failed:",
        err.message
    );

    process.exit(1);
}

db.exec(`

CREATE TABLE IF NOT EXISTS users (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    username TEXT UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role TEXT NOT NULL
)
`);