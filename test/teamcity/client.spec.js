'use strict';
const TeamCityClient = require('../../teamcity/client');
const nock = require('nock')
;
const chai = require('chai')
    , expect = chai.expect
    , should = chai.should();


describe('teamcityClient', function () {

    const TEAMCITY_BASE_URL = 'http://teamcityurl.com:8001';
    const teamcityClient = new TeamCityClient(TEAMCITY_BASE_URL);


    function nockForJsonTeamCity() {
        return nock(TEAMCITY_BASE_URL)
        // .log(console.log)
            .matchHeader('accept', 'application/json');
    }

    beforeEach(function () {
        nock.cleanAll();
    });

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
        const BUILD_ID = '11068613';

        function changesBasePathWith(buildId) {
            return `/app/rest/changes?locator=build:(id:${buildId})`
        }

        const CHANGES_RESPONSE = {
            "count": 5,
            "href": "/app/rest/changes?locator=build:(id:11068613)",
            "change": [
                {
                    "id": 306033,
                    "version": "099eb0d98746e379b48b3bc268be0933c34de022",
                    "username": "teamhiro",
                    "date": "20170811T125202+0100",
                    "href": "/app/rest/changes/id:306033",
                    "webUrl": "http://teamcity.sns.sky.com:8111/viewModification.html?modId=306033&personal=false"
                },
                {
                    "id": 306032,
                    "version": "551fe469166843d42359acb5a464ea0db146b31e",
                    "username": "teamhiro",
                    "date": "20170810T115945+0100",
                    "href": "/app/rest/changes/id:306032",
                    "webUrl": "http://teamcity.sns.sky.com:8111/viewModification.html?modId=306032&personal=false"
                },
                {
                    "id": 306031,
                    "version": "e2b690dcd4f3ea93a00458fa702d9bffcd3ffff1",
                    "username": "teamhiro",
                    "date": "20170808T170207+0100",
                    "href": "/app/rest/changes/id:306031",
                    "webUrl": "http://teamcity.sns.sky.com:8111/viewModification.html?modId=306031&personal=false"
                },
                {
                    "id": 306027,
                    "version": "c2b960047b34ca0e07a6c32957caf6b754e3bc6e",
                    "username": "team.hiro",
                    "date": "20170811T124652+0100",
                    "href": "/app/rest/changes/id:306027",
                    "webUrl": "http://teamcity.sns.sky.com:8111/viewModification.html?modId=306027&personal=false"
                },
                {
                    "id": 305994,
                    "version": "6565ebcc6cd5caa6996c28cc686ca1a2a311bf26",
                    "username": "team.hiro",
                    "date": "20170811T123753+0100",
                    "href": "/app/rest/changes/id:305994",
                    "webUrl": "http://teamcity.sns.sky.com:8111/viewModification.html?modId=305994&personal=false"
                }]
        };

        it('get all changes', function () {
            nockForJsonTeamCity()
                .get(changesBasePathWith(BUILD_ID))
                .reply(200, CHANGES_RESPONSE)
            ;

            return teamcityClient.getChangesRefs(BUILD_ID)
                .then(function (changesRefs) {
                        expect(changesRefs).to.have.ordered.members([
                                '/app/rest/changes/id:306033',
                                '/app/rest/changes/id:306032',
                                '/app/rest/changes/id:306031',
                                '/app/rest/changes/id:306027',
                                '/app/rest/changes/id:305994'
                            ]
                        );
                    }
                )
        });
    });

    describe('get comment for changeref', function () {
        const CHANGE_ID = '11068613';

        function changesBaseForWith(changeId) {
            return `/app/rest/changes/id:${changeId}`
        }

        const CHANGE_RESPONSE = {
            "id": 306033,
            "version": "099eb0d98746e379b48b3bc268be0933c34de022",
            "username": "teamhiro",
            "date": "20170811T125202+0100",
            "href": "/app/rest/changes/id:306033",
            "webUrl": "http://teamcity.sns.sky.com:8111/viewModification.html?modId=306033&personal=false",
            "comment": "HIRO-1231231: James,Karl - Added tests and implementation to handle AmendRequestedDeliveryDateInstruction in Provide order\n",
            "files": {
                "file": [{
                    "before-revision": "551fe469166843d42359acb5a464ea0db146b31e",
                    "after-revision": "099eb0d98746e379b48b3bc268be0933c34de022",
                    "file": "tequila-acceptance-test/src/test/java/sky/sns/tequila/acceptance/nvnvoiceanddata/ProvideWithProvideAmendFlowTest.java",
                    "relative-file": "tequila-acceptance-test/src/test/java/sky/sns/tequila/acceptance/nvnvoiceanddata/ProvideWithProvideAmendFlowTest.java"
                }, {
                    "before-revision": "551fe469166843d42359acb5a464ea0db146b31e",
                    "after-revision": "099eb0d98746e379b48b3bc268be0933c34de022",
                    "file": "tequila-acceptance-test/src/test/java/sky/sns/tequila/acceptance/nvnvoiceanddata/provide/collider/ipadd/SendAmendOrderProvisioningInstructionTest.java",
                    "relative-file": "tequila-acceptance-test/src/test/java/sky/sns/tequila/acceptance/nvnvoiceanddata/provide/collider/ipadd/SendAmendOrderProvisioningInstructionTest.java"
                }]
            },
            "vcsRootInstance": {
                "id": "20469",
                "vcs-root-id": "SnsGenericGitLabRepositories",
                "name": "SNS Generic GitLab Repositories",
                "href": "/app/rest/vcs-root-instances/id:20469"
            }
        };
        it('get comment', function () {
            nockForJsonTeamCity()
                .get(changesBaseForWith(CHANGE_ID))
                .reply(200, CHANGE_RESPONSE)
            ;

            return teamcityClient.getChange(CHANGE_ID)
                .then(function (change) {
                        expect(change.comment).to.be.equal(
                            'HIRO-1231231: James,Karl - Added tests and implementation to handle AmendRequestedDeliveryDateInstruction in Provide order',
                        );
                    }
                )
        });
    })
});