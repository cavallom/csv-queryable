const pjson = require('./package.json');

/**
 * Just to check the success of the installation, also returns basic package information.
 * No parameters.
 */
function itWorks() {
    return JSON.stringify({"itWorks": "Yes, it works!"
    , "package": pjson.name
    , "version": pjson.version
    });
}


module.exports = {itWorks}