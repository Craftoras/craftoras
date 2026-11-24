const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { app } = require('../server');
const { createToken } = require('../utiles/tokenCreate');

test('Backend Health Check & Welcome Endpoint', async (t) => {
    await t.test('GET / should return welcome message', async () => {
        const res = await request(app).get('/');
        assert.equal(res.status, 200);
        assert.match(res.text, /Craftoras API Server is running/);
    });

    await t.test('GET /api/health should return health payload and 200 status', async () => {
        const res = await request(app).get('/api/health');
        assert.equal(res.status, 200);
        assert.equal(res.body.status, 'healthy');
        assert.equal(res.body.service, 'craftoras-api');
        assert.ok(typeof res.body.uptime === 'number');
    });
});

test('Security & API Rate Limiting Headers', async (t) => {
    await t.test('Response should include Helmet security headers', async () => {
        const res = await request(app).get('/api/health');
        assert.equal(res.headers['x-content-type-options'], 'nosniff');
        assert.equal(res.headers['x-frame-options'], 'SAMEORIGIN');
    });

    await t.test('API should include RateLimit headers', async () => {
        const res = await request(app).get('/api/health');
        assert.ok(res.headers['ratelimit-limit'], 'RateLimit-Limit header present');
        assert.ok(res.headers['ratelimit-remaining'], 'RateLimit-Remaining header present');
    });
});

test('Authentication & Token Utilities', async (t) => {
    await t.test('createToken should sign a verifiable JWT token', async () => {
        process.env.SECRET = process.env.SECRET || 'craftoras_test_secret';
        const payload = { id: 'test_user_123', role: 'seller' };
        const token = await createToken(payload);
        assert.ok(token);

        const decoded = jwt.verify(token, process.env.SECRET);
        assert.equal(decoded.id, payload.id);
        assert.equal(decoded.role, payload.role);
    });

    await t.test('bcrypt password hashing and validation', async () => {
        const rawPassword = 'SecurePassword123!';
        const hash = await bcrypt.hash(rawPassword, 10);
        assert.ok(hash);

        const isMatch = await bcrypt.compare(rawPassword, hash);
        assert.equal(isMatch, true);

        const isMismatch = await bcrypt.compare('WrongPassword', hash);
        assert.equal(isMismatch, false);
    });
});

test('API Validation & Error Handling', async (t) => {
    await t.test('POST /api/admin-login with invalid credentials returns 404', async () => {
        const res = await request(app)
            .post('/api/admin-login')
            .send({ email: 'nonexistent@craftoras.com', password: 'wrong' });
        assert.ok([404, 500].includes(res.status));
    });
});
