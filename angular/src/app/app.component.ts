import {Component} from '@angular/core';
import {Build} from './build'

const BUILDS: Build[] = [
    {id: 'Tequila_Provisioning', name: 'Tequila Master Release', status: 'SUCCESS', path: "/Provisioning/Tequila"},
    {id: 'Corona_Provisioning', name: 'Corona', status: 'SUCCESS', path: "/Provisioning/Corona"},
    {id: 'HaloId', name: 'Halo', status: 'FAILED', path: "/Provisioning/Halo"},
    {
        id: 'SaltFaithId',
        name: 'Run SALT Faith Tests',
        status: 'SUCCESS',
        path: "/Netstream/Netstream Trunk/Faith/Docker"
    },
    {id: 'IomFaithId', name: 'Run IOM Faith Tests', status: 'SUCCESS', path: "/Netstream/Netstream Trunk/Faith/Docker"},
    {id: 'Halo_commonsId', name: 'Halo Commons', status: 'SUCCESS', path: "/Hiro Projects"}
];

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
    `]
})
export class AppComponent {

    projectsWithBuilds = PROJECTS_GROUPS.map(p => new ProjectWithBuilds(p, BUILDS
            .filter(value => value.status === 'SUCCESS')
            .filter(value => value.path.includes(`/${p}`))
        )
    );

    failedBuilds = BUILDS.filter(value => value.status === 'FAILED');
}