'use strict';
const TeamCityClient = require('../../teamcity/client');
const nock = require('nock')
;
const chai = require('chai');
chai.should();


describe('teamcityClient', function () {

    const TEAMCITY_BASE_URL = 'http://teamcityurl.com:8001';
    const teamcityClient = new TeamCityClient(TEAMCITY_BASE_URL);


    function nockForJsonTeamCity() {
        return nock(TEAMCITY_BASE_URL)
        // .log(console.log)
            .matchHeader('accept', 'application/json');
    }

    describe('get latest build by type ', function () {
        const BUILD_TYPE_NAME = 'Provisioning_Tequila';
        const LATEST_BUILD_BASE_PATH = `/app/rest/builds?locator=buildType:${BUILD_TYPE_NAME},count:1`;
        const latestBuildResponse = {
            "count": 1,
            "href": "/app/rest/builds?locator=buildType:Provisioning_Tequila,count:1",
            "nextHref": "/app/rest/builds?locator=buildType:Provisioning_Tequila,count:1,start:1",
            "build": [{
                "id": 10903080,
                "buildTypeId": "Provisioning_Tequila",
                "number": "521",
                "status": "SUCCESS",
                "state": "finished",
                "href": "/app/rest/builds/id:10903080",
                "webUrl": "http://teamcity.sns.sky.com:8111/viewLog.html?buildId=10903080&buildTypeId=Provisioning_Tequila"
            }]
        };
        beforeEach(function () {
            nock.cleanAll();
        });

        it('without filters ', function () {
            nockForJsonTeamCity()
                .get(LATEST_BUILD_BASE_PATH + ',running:any')
                .reply(200, latestBuildResponse)
            ;

            return teamcityClient.getLatestBuildId(BUILD_TYPE_NAME)
                .then(function (latestBuildLink) {
                        latestBuildLink.should.equal("/app/rest/builds/id:10903080")
                    }
                )
        });
        it('with status filter', function () {
            nockForJsonTeamCity()
                .get(LATEST_BUILD_BASE_PATH + ',running:any,status:FAILURE')
                .reply(200, latestBuildResponse)
            ;

            return teamcityClient.getLatestBuildId(BUILD_TYPE_NAME, {status: 'FAILURE'})
                .then(function (latestBuildLink) {
                        latestBuildLink.should.equal("/app/rest/builds/id:10903080")
                    }
                )
        });
        it('with running filter ', function () {
            nockForJsonTeamCity()
                .get(LATEST_BUILD_BASE_PATH + ',running:true')
                .reply(200, latestBuildResponse)
            ;

            return teamcityClient.getLatestBuildId(BUILD_TYPE_NAME, {running: 'true'})
                .then(function (latestBuildLink) {
                        latestBuildLink.should.equal("/app/rest/builds/id:10903080")
                    }
                )
        });


    });

    describe('get changes ids for build id', function () {
        const BUILD_ID = '10997002';
        const changesPath = `/app/rest/changes?locator=build:(id:${BUILD_ID})`;
        beforeEach(function () {
            nock.cleanAll();
        });
        it('get 1 change only');
        it('get more then 1 change ');

    })
});