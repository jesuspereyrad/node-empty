const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

// Get urls from string
exports.foundUrls = (string) => string.match(regex);

// Remove url from string
exports.replaceUrls = (string) => string.replace(regex);