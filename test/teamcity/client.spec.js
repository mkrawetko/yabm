'use strict';
const TeamCityClient = require('../../teamcity/client');
const sinon = require('sinon');
const chai = require('chai');
chai.should();
const unirest = require('unirest');

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

describe('teamcityClient', function () {

    let teamcityClient = new TeamCityClient("http:///teamcityurl.com");


    describe('get latest build by type: ', function () {
        beforeEach(function () {
            this.get = sinon.stub(unirest, 'get');
            console.log("beforeEach worked")
        });
        afterEach(function () {
            this.get.restore();
        });
        it('should return latest build id by build type ', function () {
            let mockUnirest = {
                headers: function () {
                    return {
                        end: function (cb) {
                            cb({
                                body: latestBuildResponse
                            });
                        }
                    };
                }
            };
            this.get.returns(mockUnirest);
            return teamcityClient.getLatestBuildId('Provisioning_Tequila')
                .then(function (latestBuildLink) {
                        console.log(latestBuildLink);
                        latestBuildLink.should.equal("/app/rest/builds/id:10903080")
                    }
                )
        })
    })
});