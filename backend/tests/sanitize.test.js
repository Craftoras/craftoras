const { describe, it } = require('node:test');
const assert = require('node:assert');
const { safeString, safeObjectId, safeRegex } = require('../utiles/sanitize');

describe('Input Sanitization & NoSQL Injection Prevention', () => {
    it('safeString should accept plain strings and reject operator objects', () => {
        assert.strictEqual(safeString('artisan@craftoras.com', 'email'), 'artisan@craftoras.com');
        assert.throws(() => safeString({ $ne: null }, 'email'), /Invalid email/);
        assert.throws(() => safeString(['a'], 'email'), /Invalid email/);
        assert.throws(() => safeString(null, 'email'), /Invalid email/);
    });

    it('safeObjectId should accept valid 24-hex IDs and reject invalid or object payloads', () => {
        const oid = safeObjectId('507f1f77bcf86cd799439011', 'id');
        assert.strictEqual(oid.toString(), '507f1f77bcf86cd799439011');
        assert.throws(() => safeObjectId('not-an-objectid', 'id'), /Invalid id/);
        assert.throws(() => safeObjectId({ $gt: '' }, 'id'), /Invalid id/);
    });

    it('safeRegex should escape special RegExp characters', () => {
        assert.strictEqual(safeRegex('pashmina.*(test)'), 'pashmina\\.\\*\\(test\\)');
        assert.strictEqual(safeRegex({ $ne: '' }), '');
    });
});
