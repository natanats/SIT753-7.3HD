const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');

const app = require('../server.js');

let server;
let baseUrl;


// Start test server
test.before(async () => {

    server = http.createServer(app);

    await new Promise((resolve) => {
        server.listen(0, resolve);
    });

    const port = server.address().port;

    baseUrl = `http://localhost:${port}`;
});


// Stop test server
test.after(async () => {

    await new Promise((resolve) => {
        server.close(resolve);
    });
});


// Helper function
async function request(path, options = {}) {

    const response = await fetch(
        `${baseUrl}${path}`,
        options
    );

    const text = await response.text();

    let body;

    try {
        body = JSON.parse(text);
    } catch {
        body = text;
    }

    return {
        status: response.status,
        body,
        headers: response.headers
    };
}


// 1. Homepage
test('GET / should return the homepage', async () => {

    const response = await request('/');

    assert.strictEqual(
        response.status,
        200
    );
});


// 2. 404 handler
test('Unknown route should return 404', async () => {

    const response = await request(
        '/api/unknown'
    );

    assert.strictEqual(
        response.status,
        404
    );

    assert.strictEqual(
        response.body.error,
        'Not Found'
    );
});


// 3. Register successfully
test('POST /api/register should register a new user', async () => {

    const username =
        `testuser_${Date.now()}`;

    const response = await request(
        '/api/register',
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify({

                name: 'Test',

                surname: 'User',

                email:
                    `${username}@example.com`,

                phone: '0400000000',

                address: 'Test Address',

                username: username,

                password: 'Password123'
            })
        }
    );

    assert.strictEqual(
        response.status,
        201
    );
});


// 4. Register missing fields
test('POST /api/register should reject missing fields', async () => {

    const response = await request(
        '/api/register',
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify({

                username: 'missing_test'

            })
        }
    );

    assert.strictEqual(
        response.status,
        400
    );
});


// 5. Duplicate username
test('POST /api/register should reject duplicate username', async () => {

    const username =
        `duplicate_${Date.now()}`;

    const user = {

        name: 'Test',

        surname: 'User',

        email:
            `${username}@example.com`,

        phone: '0400000000',

        address: 'Test Address',

        username: username,

        password: 'Password123'
    };

    await request(
        '/api/register',
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify(user)
        }
    );

    const response = await request(
        '/api/register',
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify(user)
        }
    );

    assert.strictEqual(
        response.status,
        400
    );
});


// 6. Login successfully
test('POST /api/login should login with correct credentials', async () => {

    const username =
        `loginuser_${Date.now()}`;

    await request(
        '/api/register',
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify({

                name: 'Login',

                surname: 'User',

                email:
                    `${username}@example.com`,

                phone: '0400000000',

                address: 'Test Address',

                username: username,

                password: 'Password123'
            })
        }
    );

    const response = await request(
        '/api/login',
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify({

                username: username,

                password: 'Password123'
            })
        }
    );

    assert.strictEqual(
        response.status,
        200
    );
});


// 7. Wrong password
test('POST /api/login should reject wrong password', async () => {

    const username =
        `wrongpass_${Date.now()}`;

    await request(
        '/api/register',
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify({

                name: 'Test',

                surname: 'User',

                email:
                    `${username}@example.com`,

                phone: '0400000000',

                address: 'Test Address',

                username: username,

                password: 'Password123'
            })
        }
    );

    const response = await request(
        '/api/login',
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify({

                username: username,

                password: 'WrongPassword'
            })
        }
    );

    assert.strictEqual(
        response.status,
        401
    );
});


// 8. User without session
test('GET /api/user should reject unauthenticated user', async () => {

    const response = await request(
        '/api/user'
    );

    assert.strictEqual(
        response.status,
        401
    );
});


// 9. Get contacts
test('GET /api/contacts should return contacts', async () => {

    const response = await request(
        '/api/contacts'
    );

    assert.strictEqual(
        response.status,
        200
    );

    assert.strictEqual(
        Array.isArray(response.body),
        true
    );
});


// 10. Add contact
test('POST /api/contacts should add a contact', async () => {

    const response = await request(
        '/api/contacts',
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify({

                name: 'Test',

                surname: 'Contact',

                email:
                    'contact@example.com',

                phone: '0400000000',

                topic: 'Testing',

                message: 'Test message'
            })
        }
    );

    assert.strictEqual(
        response.status,
        201
    );
});


// 11. Contact missing fields
test('POST /api/contacts should reject missing fields', async () => {

    const response = await request(
        '/api/contacts',
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify({

                name: 'Test'

            })
        }
    );

    assert.strictEqual(
        response.status,
        400
    );
});


// 12. DELETE contacts without authentication
test('DELETE /api/contacts should reject unauthenticated users', async () => {

    const response = await request(
        '/api/contacts',
        {
            method: 'DELETE'
        }
    );

    assert.strictEqual(
        response.status,
        401
    );
});