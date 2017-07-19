"use strict";

let unirest = require('unirest');

var TEAMCITYCLIENT = function (baseUrl) {
    this._baseUrl = baseUrl;
};
module.exports = TEAMCITYCLIENT;


TEAMCITYCLIENT.prototype.getLatestBuildId = function (buildType) {
    let self = this;
    return new Promise(function (resolve) {
        unirest.get(self._baseUrl + `/app/rest/builds?locator=buildType:${buildType},count:1`)
            .headers({'Accept': 'application/json'})
            .end(function (response) {
                // console.log(response.body);
                resolve(response.body.build[0].href)
            })
    })
};

