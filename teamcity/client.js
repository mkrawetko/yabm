'use strict';
let unirest = require('unirest');

let teamcityclient = function (baseUrl) {

    const lasestBuildByTypeUrl = function (buildType) {
        return baseUrl + `/app/rest/builds?locator=buildType:${buildType},count:1`;
    };

    function getLatestBuildId(buildType) {
        return new Promise(function (resolve) {
            unirest.get(lasestBuildByTypeUrl(buildType))
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