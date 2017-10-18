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
    template: `

        <div *ngIf="failedBuilds.length>0">
            <ul class="builds">
                <li *ngFor="let build of failedBuilds">
                    <span class="failed">{{build.name}}</span>
                </li>
            </ul>
        </div>
        <ul class="builds">
            <li *ngFor="let projectWithBuilds of projectsWithBuilds">
                <span class="success">{{projectWithBuilds.project}}</span>
                <ul class="builds">
                    <li *ngFor="let build of projectWithBuilds.builds">
                        <span class="success">{{build.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    `,
    styles: [`

        .builds {
        }

        .builds li {
            cursor: pointer;
            position: relative;
            background-color: #EEE;
            padding: 0.3em 0;
            display: inline;
        }

        .builds li:hover {
            color: #607D8B;
            background-color: #DDD;
            left: .1em;
        }

        .builds .success {
            display: inline-block;
            font-size: 1em;
            color: green;
            padding: 0.8em 0.7em 0 0.7em;
            line-height: 1em;
            position: relative;
        }

        .builds .failed {
            display: inline-block;
            font-size: 6em;
            color: red;
            line-height: 1em;
            position: relative;
        }
    `],
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