"use strict";

let map = new WeakMap();

let internal = function (object) {
    if (!map.has(object))
        map.set(object, {});
    return map.get(object);
};

const TEAMCITYSERVICE = function (_baseUrl) {
    internal(this).baseUrl = _baseUrl;
};
module.exports = TEAMCITYSERVICE;


TEAMCITYSERVICE.prototype.getLatestBuildInfo = function () {
};



