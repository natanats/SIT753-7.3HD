const express = require('express');
const path = require('path');
const logger = require('morgan');
const { DatabaseSync } = require('node:sqlite');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

let db;


// DATABASE SETUP
try {

    db = new DatabaseSync("techzone.db");

    // CONTACTS TABLE
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

    // USERS TABLE
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL
        )
    `);

    console.log("Database initialised");

} catch (err) {

    console.error(
        "Database error:",
        err.message
    );

    process.exit(1);
}


// MIDDLEWARE
app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    }
}));

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);


// AUTHORIZATION MIDDLEWARE
function requireAuth(role) {

    return (req, res, next) => {

        if (!req.session.user) {

            return res.status(401).json({
                error: 'Not logged in'
            });
        }

        if (
            role &&
            req.session.user.role !== role
        ) {

            return res.status(403).json({
                error: 'Access denied'
            });
        }

        next();
    };
}


// HOME ROUTE
app.get('/', (req, res) => {

    res.json({
        message: 'Welcome to Express Server'
    });
});


// GET ALL CONTACTS
app.get('/api/contacts', (req, res) => {

    const stmt = db.prepare(
        "SELECT * FROM contacts"
    );

    const contacts = stmt.all();

    res.json(contacts);
});


// ADD CONTACT
app.post('/api/contacts', (req, res) => {

    const {
        name,
        surname,
        email,
        phone,
        topic,
        message
    } = req.body;

    if (
        !name ||
        !surname ||
        !email ||
        !phone ||
        !topic ||
        !message
    ) {

        return res.status(400).json({
            error: 'All fields are required'
        });
    }

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

    stmt.run(
        name,
        surname,
        email,
        phone,
        topic,
        message
    );

    res.status(201).json({
        message: 'Contact added successfully'
    });
});


// DELETE ALL CONTACTS
app.delete(
    '/api/contacts',
    requireAuth('admin'),
    (req, res) => {

        db.exec(
            "DELETE FROM contacts"
        );

        res.json({
            message: 'All contacts cleared'
        });
    }
);


// REGISTER USER
app.post('/api/register', (req, res) => {

    const {
        name,
        surname,
        email,
        phone,
        address,
        username,
        password
    } = req.body;

    if (
        !name ||
        !surname ||
        !email ||
        !phone ||
        !address ||
        !username ||
        !password
    ) {

        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    const existingUser = db
        .prepare(
            "SELECT * FROM users WHERE username = ?"
        )
        .get(username);

    if (existingUser) {

        return res.status(400).json({
            error: 'Username already exists'
        });
    }

    const passwordHash = bcrypt.hashSync(
        password,
        10
    );

    db.prepare(`
        INSERT INTO users
        (
            name,
            surname,
            email,
            phone,
            address,
            username,
            password_hash,
            role
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
        name,
        surname,
        email,
        phone,
        address,
        username,
        passwordHash,
        'member'
    );

    req.session.user = {
        name: name,
        email: email,
        username: username,
        role: 'member'
    };

    res.status(201).json({
        message: 'Registered successfully'
    });
});


// LOGIN USER
app.post('/api/login', (req, res) => {

    const {
        username,
        password
    } = req.body;

    const user = db
        .prepare(
            "SELECT * FROM users WHERE username = ?"
        )
        .get(username);

    if (!user) {

        return res.status(401).json({
            error: 'Invalid username or password'
        });
    }

    const valid = bcrypt.compareSync(
        password,
        user.password_hash
    );

    if (!valid) {

        return res.status(401).json({
            error: 'Invalid username or password'
        });
    }

    req.session.user = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
    };

    res.json({
        message: 'Login successful'
    });
});


// GET CURRENT USER
app.get('/api/user', (req, res) => {

    if (!req.session.user) {

        return res.status(401).json({
            error: 'Not logged in'
        });
    }

    res.json({
        user: req.session.user
    });
});


// 404 HANDLER
app.use((req, res) => {

    res.status(404).json({
        error: 'Not Found'
    });
});


// ERROR HANDLER
app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({
        error: 'Internal Server Error'
    });
});


// START SERVER
if (require.main === module) {

    app.listen(PORT, () => {

        console.log(
            `Server is running on http://localhost:${PORT}`
        );

        console.log(
            'Type Ctrl+C to shut down the web server'
        );
    });
}


// EXPORT APP FOR TESTING
module.exports = app;