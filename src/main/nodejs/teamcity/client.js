"use strict";

let unirest = require('unirest');
let _ = require("underscore");

let map = new WeakMap();

let internal = function (object) {
    if (!map.has(object))
        map.set(object, {});
    return map.get(object);
};

const TEAMCITYCLIENT = function (_baseUrl) {
    internal(this).baseUrl = _baseUrl;
};
module.exports = TEAMCITYCLIENT;


TEAMCITYCLIENT.prototype.getLatestBuild = function (buildType, filters) {
    let self = this;

    function getPathWithFilters() {
        let path = `/app/rest/builds?locator=buildType:${buildType},count:1`;
        let finalFilters = _.extend({running: 'any'}, filters);
        // console.log("final filters:");
        // console.log(finalFilters);
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
        // console.log("requested url:" + self._baseUrl + path);
        unirest.get(internal(self).baseUrl + path)
            .headers({'Accept': 'application/json'})
            .end(function (response) {
                // console.log(response.body);
                resolve({id: response.body.build[0].id.toString()})
            })
    })
};


function callJsonForPath(path, baseUrl) {
    return unirest.get(baseUrl + path)
        .headers({'Accept': 'application/json'});
}

TEAMCITYCLIENT.prototype.getBuildChanges = function (buildId) {
    let self = this;

    return new Promise(function (resolve) {
        let path = `/app/rest/changes?locator=build:(id:${buildId})`;
        // console.log("requested url:" + self._baseUrl + path);
        callJsonForPath(path, internal(self).baseUrl)
        // self.callJsonForPath(path)
            .end(function (response) {
                resolve(response.body.change.map(function (obj) {
                    return obj.id.toString()
                }))
            })
        ;
    })
};

TEAMCITYCLIENT.prototype.getChange = function (changeId) {
    let self = this;

    return new Promise(function (resolve) {
        let path = `/app/rest/changes/id:${changeId}`;
        // console.log("requested url:" + self._baseUrl + path);
        unirest.get(internal(self).baseUrl + path)
            .headers({'Accept': 'application/json'})
            .end(function (response) {
                resolve({comment: response.body.comment})
            })
        ;
    })
};

