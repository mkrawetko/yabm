'use strict';
let unirest = require('unirest');

let teamcityclient = function (baseUrl) {

    function getLatestBuildId(buildType) {
        return new Promise(function (resolve) {
            unirest.get(baseUrl + `/app/rest/builds?locator=buildType:${buildType},count:1`)
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
module.exports = teamcityclient;