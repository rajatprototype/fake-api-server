
/**
 * Command arguments
 * @returns {Array<string>}
 */
const args = () => {
    return process.argv.slice(2);
}

/**
 * Check if string is an value or command line option
 * @param {string} val - Value
 */
const isKey = (val) => {
    return val.indexOf('--') == 0
}

/**
 * Check if given key exists in argument list
 * @returns {boolean}
 */
exports.isKeyExists = (key) => {
    return args().includes('--'.concat(key));
}

/**
 * Give value of specific key
 * @param {string} key - Argument option key
 * @returns {string}
 */
exports.get = (key) => {

    const list = args();

    // Indentify as flag
    key = '--'.concat(key);

    const index = list.indexOf(key)
    const val = list[index + 1];

    if (index === -1) {
        return undefined;
    }

    if (!val) {
        return null;
    }

    // next element should not option key
    if (isKey(val)) {
        return null;
    }

    return val;
}

/**
 * All option key entries
 * @returns {Array<string>}
 */
exports.entries = () => {
    return args().filter(arg => isKey(arg));
}