const isObject = require('lodash.isobject');
const isEmpty = require('lodash.isempty');
const isEqual = require('lodash.isequal');

/**
 *
 * @param value
 * @returns {boolean}
 */
const isEmptyWraper = (value) => {
    let typeofValue = typeof value;
    return isEqual(typeofValue, 'number')
        ? !value
        : isEmpty(value);
};

/**
 *
 * @param {String} message Recibe un mensaje y devuelve el mismo, con otro formato.
 */
const logPrettyJSON = (message) => {
    const { LOG_PRETTY } = process.env;
    return isEmptyWraper(LOG_PRETTY)
        ? JSON.stringify(message)
        : JSON.stringify(message, null, LOG_PRETTY);
};

/**
 *
 * @param message
 * @returns {string|*}
 */
const standardLog = (message) => {
    const { LOG_PRETTY } = process.env;
    const jsonStringify = isEmptyWraper(LOG_PRETTY)
        ? JSON.stringify(message)
        : JSON.stringify(message, null, LOG_PRETTY);
    return isObject(message) ? jsonStringify : message;
};

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
