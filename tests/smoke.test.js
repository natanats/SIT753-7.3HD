const test = require('node:test');
const assert = require('node:assert');

test('TechZone project files should exist', () => {
    const fs = require('node:fs');

    assert.strictEqual(fs.existsSync('server.js'), true);
    assert.strictEqual(fs.existsSync('package.json'), true);
    assert.strictEqual(fs.existsSync('public/index.html'), true);
});

test('package.json should contain a start script', () => {
    const packageJson = require('../package.json');

    assert.strictEqual(typeof packageJson.scripts.start, 'string');
});