const isObject = require('lodash.isobject');

/**
 *
 * @param {String} message Recibe un mensaje y devuelve el mismo, con otro formato.
 */
const logPrettyJSON = (message) => JSON.stringify(message);

/**
 *
 * @param message
 * @returns {string|*}
 */
const standardLog = (message) =>
    isObject(message) ? JSON.stringify(message) : message;

const logMethods = {
    debug: logPrettyJSON,
    info: standardLog,
    warn: standardLog,
    error: logPrettyJSON
};

const availableLogMethods = Object.keys(logMethods);

module.exports = {
    logMethods,
    availableLogMethods
};
