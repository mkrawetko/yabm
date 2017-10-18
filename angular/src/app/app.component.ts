import {Component, OnInit} from '@angular/core';
import {Build} from './build'
import {BuildService} from "./build.service";

const PROJECTS_GROUPS: string[] = [
    'Provisioning', 'Hiro Projects', 'Faith'
];
const BUIDLS_TO_REQUEST: string[] = [
    'Tequila_Provisioning', 'Corona_Provisioning', 'HaloId', 'SaltFaithId', 'IomFaithId', 'Halo_commonsId'
];

export class ProjectWithBuilds {
    project: string;
    builds: Build[];

    constructor(project: string, builds: Build[]) {
        this.project = project;
        this.builds = builds;
    }
}

@Component({
    selector: 'build-monitor-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [BuildService]

})
export class AppComponent implements OnInit {
    projectsWithBuilds: ProjectWithBuilds[] = [];
    failedBuilds: Build[] = [];

    ngOnInit(): void {

        console.log("about to get Builds!" + new Date());

        this.buildsService.getBuildsSlowly().then(allBuilds => {

            this.projectsWithBuilds = PROJECTS_GROUPS.map(p => new ProjectWithBuilds(p, allBuilds
                    .filter(value => value.status === 'SUCCESS')
                    .filter(value => value.path.includes(`/${p}`))
                )
            );
            this.failedBuilds = allBuilds.filter(value => value.status === 'FAILED');
            console.log("builds set" + new Date());
        });

    }

    constructor(private buildsService: BuildService) {
    }
}