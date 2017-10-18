import {Build} from "./build";
import {BUILDS} from "./mock-builds";


export class BuildService {
    getBuilds(): Build[] {
        return BUILDS;
    }
}