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

    let teamcityClient = new TeamCityClient(TEAMCITY_BASE_URL);


    describe('get latest build by type: ', function () {
        beforeEach(function () {
            console.log("beforeEach worked");
            nock.cleanAll();
        });

        it('should return latest build id by build type ', function () {
            nock(TEAMCITY_BASE_URL).log(console.log)
                .matchHeader('accept', 'application/json')
                .get('/app/rest/builds?locator=buildType:Provisioning_Tequila,count:1')
                .reply(200, latestBuildResponse)
            ;

            return teamcityClient.getLatestBuildId('Provisioning_Tequila')
                .then(function (latestBuildLink) {
                        console.log(latestBuildLink);
                        latestBuildLink.should.equal("/app/rest/builds/id:10903080")
                    }
                )
        })
    })
});