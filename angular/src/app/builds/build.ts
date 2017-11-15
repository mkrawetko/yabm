export class Build {
    id: string;
    name: string;
    status: STATUS;
    path: string;
}

export enum STATUS {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}