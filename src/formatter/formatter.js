const { Log } = require('../models');
const { logMethods } = require('./log-methods');
const { getObjectType, isError } = require('../utils');

/**
 *
 * @param levels
 * @param level
 * @param filename
 * @param line
 * @returns {Log}
 */
const buildLog = (levels, level, filename, line) => {
    const objectType = getObjectType(levels[level]);
    const message = formatMessage(levels, level);
    const label = formatLabel(filename);
    return new Log(message, line, label, objectType);
};

/**
 *
 * @param filename
 * @returns {string|*}
 */
const formatLabel = (filename) => {
    let parts = filename.split('/');
    return parts.length !== 1
        ? parts[parts.length - 2] + '/' + parts.pop()
        : filename;
};

/**
 *
 * @param levels
 * @param level
 * @returns {string|*}
 */
const formatMessage = (levels, level) => {
    let message = levels[level];
    if (!isError(message)) {
        return logMethods[level](message);
    }
    return formatError(message).message;
};

/**
 *
 * @param message
 * @returns {{message: string}}
 */
const formatError = (message) => {
    let response;
    response = message;
    return {
        message: response.message
            ? response.message
            : JSON.stringify(response)
    };
};

module.exports = {
    buildLog
};
