import {Component, OnInit} from '@angular/core';
import {Build, STATUS} from './builds/build'
import {BuildService} from "./builds/build.service";

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
        this.updateBuildsStatus();
    }

    private updateBuildsStatus() {

        this.buildsService.getBuildsSlowly().then(allBuilds => {
            this.projectsWithBuilds = PROJECTS_GROUPS.map(p => new ProjectWithBuilds(p, allBuilds
                    .filter(value => value.status === STATUS.SUCCESS)
                    .filter(value => value.path.includes(`/${p}`))
                )
            );
            this.failedBuilds = allBuilds.filter(value => value.status === STATUS.FAILURE);
        });
        setTimeout(() => this.updateBuildsStatus(), 2000);
    }

    constructor(private buildsService: BuildService) {
    }
}