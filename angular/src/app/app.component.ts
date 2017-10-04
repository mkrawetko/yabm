import {Component} from '@angular/core';

@Component({
    selector: 'build-monitor-app',
    template: `
        <h1>{{ heading }}</h1>
        <h2>{{build.name}}</h2>
        <p>{{build.status}}</p>
    `
})
export class AppComponent {
    heading = "Hiro Builds";

    build = {
        "name": "Tequila",
        "status": "SUCCESS"
    };
}