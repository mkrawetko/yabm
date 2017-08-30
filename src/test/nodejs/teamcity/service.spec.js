'use strict';
const TeamCityService = require('../../../main/nodejs/teamcity/service');
const chai = require('chai')
    , expect = chai.expect;


describe('TeamCityService', function () {

    let teamCityClient;
    const teamcityService = new TeamCityService(teamCityClient);


    describe('#getLatestBuildInfo(buildType) ', function () {

        it('should return build id, state and status');

    });

});