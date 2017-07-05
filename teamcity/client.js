'use strict';
let config = require('./../config/config');
let unirest = require('unirest');
const teamcity = config.teamcitybaseurl;

let teamcityclient = function () {

    function getLatestBuildId(buildType) {
        return new Promise(function (resolve) {
            unirest.get(teamcity + `/app/rest/builds?locator=buildType:${buildType},count:1`)
                .headers({'Accept': 'application/json'})
                .end(function (response) {
                    // console.log(response.body);
                    resolve(response.body.build[0].href)
                })

        })
    }

    return {
        getLatestBuildId: getLatestBuildId
    }

};
module.exports = teamcityclient();