import {Build} from "./build";

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

export class BuildService {
    getBuilds(): Promise<Build[]> {
        return Promise.resolve(BUILDS);
    }
}