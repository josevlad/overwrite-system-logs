const isObject = require('lodash.isobject');
const isEmpty = require('lodash.isempty');
const isEqual = require('lodash.isequal');

/**
 *
 * @param value
 * @returns {boolean}
 */
const isNumeric = (value) => /^-?\d+$/.test(value);

/**
 *
 * @param logPretty
 * @returns {number|*}
 */
const getSpaceArgument = (logPretty) => {
    return isNumeric(logPretty) ? Number(logPretty) : logPretty;
};

/**
 *
 * @param value
 * @returns {boolean}
 */
const isEmptyWraper = (value) => {
    let typeofValue = typeof value;
    return isEqual(typeofValue, 'number') ? !value : isEmpty(value);
};

/**
 *
 * @param {String} message Recibe un mensaje y devuelve el mismo, con otro formato.
 */
const logPrettyJSON = (message) => {
    const { LOG_PRETTY } = process.env;
    return isEmptyWraper(LOG_PRETTY)
        ? JSON.stringify(message, getCircularReplacer())
        : JSON.stringify(
              message,
              getCircularReplacer(),
              getSpaceArgument(LOG_PRETTY)
          );
};

/**
 *
 * @returns {object} Analiza en objeto y lo retornar sin el error de "converting circular structure"
 */
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

/**
 *
 * @param message
 * @returns {string|*}
 */
const standardLog = (message) => {
    return isObject(message) ? logPrettyJSON(message) : message;
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
