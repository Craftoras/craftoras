const mongoose = require('mongoose');

/**
 * Ensures a user-controlled value is a plain string, preventing MongoDB
 * operator injection (e.g. { "$ne": null } or { "$gt": "" }).
 */
function safeString(value, fieldName = 'input') {
    if (typeof value !== 'string') {
        const err = new Error(`Invalid ${fieldName}: expected string`);
        err.statusCode = 400;
        throw err;
    }
    return value;
}

/**
 * Validates and converts a user-controlled ID into a Mongoose ObjectId.
 */
function safeObjectId(value, fieldName = 'id') {
    const str = safeString(value, fieldName).trim();
    if (!mongoose.Types.ObjectId.isValid(str)) {
        const err = new Error(`Invalid ${fieldName}`);
        err.statusCode = 400;
        throw err;
    }
    return new mongoose.Types.ObjectId(str);
}

/**
 * Escapes RegExp metacharacters in a user-controlled search string.
 */
function safeRegex(value) {
    const str = typeof value === 'string' ? value : '';
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
    safeString,
    safeObjectId,
    safeRegex
};
