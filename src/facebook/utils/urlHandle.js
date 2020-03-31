const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

/**
 * Get urls from string.
 *
 * @param   {String}           string - The string that will be evaluate with the regex 
 * @returns {Array[String]}
 */
exports.getUrlsFromString = (string) => string.match(regex);

/**
 * Remove url from string
 *
 * @param   {String}           string - The string we want to remove the urls 
 * @returns {Array[String]}
 */
exports.removeUrlFromString = (string) => {
    const stringCopy = string;
    return stringCopy.replace(regex, 'el link debajo');
}