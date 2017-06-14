'use strict';

let config = function () {
    let teamcitybaseurl = function () {
        let teamcitybaseurl = process.env.teamcitybaseurl;

        if (typeof teamcitybaseurl === 'undefined' || teamcitybaseurl === null) {
            throw Error('IllegalArgumentException: teamcitybaseurl environment variable needs to be set, example:' +
                ' http://testuser:testpassword@teamcity.jetbrains.com:8111')
        }
        return teamcitybaseurl;
    }();

    return {
        teamcitybaseurl: teamcitybaseurl
    }
};


module.exports = config();