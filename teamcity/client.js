"use strict";

let unirest = require('unirest');
let _ = require("underscore");

const TEAMCITYCLIENT = function (baseUrl) {
    this._baseUrl = baseUrl;
};
module.exports = TEAMCITYCLIENT;


TEAMCITYCLIENT.prototype.getLatestBuildId = function (buildType, filters) {
    let self = this;

    function getPathWithFilters() {
        let path = `/app/rest/builds?locator=buildType:${buildType},count:1`;
        let finalFilters = _.extend({running: 'any'}, filters);
        console.log("final filters:");
        console.log(finalFilters);
        for (let key in finalFilters) {
            if (finalFilters.hasOwnProperty(key)) {
                switch (key) {
                    case 'status':
                        path += ",status:" + finalFilters[key];
                        break;
                    case 'running':
                        path += ",running:" + finalFilters[key];
                        break;
                    default:
                        console.warn("unknown filter " + key);
                }
            }
        }
        return path;
    }

    return new Promise(function (resolve) {
        let path = getPathWithFilters();
        console.log("requested url:" + self._baseUrl + path);
        unirest.get(self._baseUrl + path)
            .headers({'Accept': 'application/json'})
            .end(function (response) {
                // console.log(response.body);
                resolve(response.body.build[0].href)
            })
    })
};

