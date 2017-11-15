import {Build} from "./build";
import {BUILDS} from "./mock-builds";


export class BuildService {
    getBuilds(): Promise<Build[]> {
        return Promise.resolve(BUILDS());
    }

    getBuildsSlowly(): Promise<Build[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(BUILDS()), 2000)
        })
    }
}