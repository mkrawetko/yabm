import {Component} from '@angular/core';

export class Build {
    name: string;
    status: string;
}

const BUILDS: Build[] = [
    {name: 'Tequila', status: 'SUCCESS'},
    {name: 'Corona', status: 'SUCCESS'},
    {name: 'Halo', status: 'FAILED'}
];

@Component({
    selector: 'build-monitor-app',
    template: `
        <div *ngIf="failedBuilds.length>0">
            <h2>Failed Builds</h2>
            <ul class="builds">
                <li *ngFor="let build of failedBuilds">
                    <span class="failed">{{build.name}}</span>
                </li>
            </ul>
        </div>
        <h2>My Builds</h2>
        <ul class="builds">
            <li *ngFor="let build of successfulBuilds">
                <span class="badge">{{build.name}}</span>
            </li>
        </ul>
    `,
    styles: [`
        .selected {
            background-color: #CFD8DC !important;
            color: white;
        }

        .builds {
            margin: 0 0 2em 0;
            list-style-type: none;
            padding: 0;
            width: 15em;
        }

        .builds li {
            cursor: pointer;
            position: relative;
            left: 0;
            background-color: #EEE;
            margin: .5em;
            padding: .3em 0;
            height: 1.6em;
            border-radius: 4px;
        }

        .builds li.selected:hover {
            background-color: #BBD8DC !important;
            color: white;
        }

        .builds li:hover {
            color: #607D8B;
            background-color: #DDD;
            left: .1em;
        }

        .builds .text {
            position: relative;
            top: -3px;
        }

        .builds .badge {
            display: inline-block;
            font-size: small;
            color: green;
            padding: 0.8em 0.7em 0 0.7em;
            line-height: 1em;
            position: relative;
            left: -1px;
            top: -4px;
            height: 1.8em;
            margin-right: .8em;
            border-radius: 4px 0 0 4px;
        }

        .builds .failed {
            display: inline-block;
            font-size: large;
            color: red;
            padding: 0.8em 0.7em 0 0.7em;
            line-height: 1em;
            position: relative;
            left: -1px;
            top: -4px;
            height: 1.8em;
            margin-right: .8em;
            border-radius: 4px 0 0 4px;
        }
    `]
})
export class AppComponent {
    heading = "Hiro Builds";

    successfulBuilds = BUILDS.filter(value => value.status === 'SUCCESS');
    failedBuilds = BUILDS.filter(value => value.status === 'FAILED');

    b: Build = {
        name: "Tequila",
        status: "SUCCESS"
    };
}