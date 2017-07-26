'use strict';
const TeamCityClient = require('../../teamcity/client');
const nock = require('nock')
;
const chai = require('chai');
chai.should();


describe('teamcityClient', function () {

    const TEAMCITY_BASE_URL = 'http://teamcityurl.com:8001';
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

    const teamcityClient = new TeamCityClient(TEAMCITY_BASE_URL);


    describe('get latest build by type ', function () {
        const latestBuildBasePath = '/app/rest/builds?locator=buildType:Provisioning_Tequila,count:1';
        beforeEach(function () {
            nock.cleanAll();
        });

        it('without filters ', function () {
            nock(TEAMCITY_BASE_URL).log(console.log)
                .matchHeader('accept', 'application/json')
                .get(latestBuildBasePath + ',running:any')
                .reply(200, latestBuildResponse)
            ;

            return teamcityClient.getLatestBuildId('Provisioning_Tequila')
                .then(function (latestBuildLink) {
                        console.log(latestBuildLink);
                        latestBuildLink.should.equal("/app/rest/builds/id:10903080")
                    }
                )
        });
        it('with status filter', function () {
            nock(TEAMCITY_BASE_URL).log(console.log)
                .matchHeader('accept', 'application/json')
                .get(latestBuildBasePath + ',running:any,status:FAILURE')
                .reply(200, latestBuildResponse)
            ;

            return teamcityClient.getLatestBuildId('Provisioning_Tequila', {status: 'FAILURE'})
                .then(function (latestBuildLink) {
                        console.log(latestBuildLink);
                        latestBuildLink.should.equal("/app/rest/builds/id:10903080")
                    }
                )
        });
        it('with running filter ', function () {
            nock(TEAMCITY_BASE_URL).log(console.log)
                .matchHeader('accept', 'application/json')
                .get(latestBuildBasePath + ',running:true')
                .reply(200, latestBuildResponse)
            ;

            return teamcityClient.getLatestBuildId('Provisioning_Tequila', {running: 'true'})
                .then(function (latestBuildLink) {
                        console.log(latestBuildLink);
                        latestBuildLink.should.equal("/app/rest/builds/id:10903080")
                    }
                )
        });


    })
});