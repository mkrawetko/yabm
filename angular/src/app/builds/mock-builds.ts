import {Build, STATUS} from "./build";

export function BUILDS(): Build[] {
    return [
        {
            id: 'Tequila_Provisioning',
            name: 'Tequila Master Release',
            status: STATUS.SUCCESS,
            path: "/Provisioning/Tequila"
        },
        {id: 'Corona_Provisioning', name: 'Corona', status: STATUS.SUCCESS, path: "/Provisioning/Corona"},
        {id: 'HaloId', name: 'Halo', status: STATUS.SUCCESS, path: "/Provisioning/Halo"},
        {
            id: 'SaltFaithId',
            name: 'Run SALT Faith Tests',
            status: STATUS.SUCCESS,
            path: "/Netstream/Netstream Trunk/Faith/Docker"
        },
        {
            id: 'IomFaithId',
            name: 'Run IOM Faith Tests',
            status: STATUS.SUCCESS,
            path: "/Netstream/Netstream Trunk/Faith/Docker"
        },
        {id: 'Halo_commonsId', name: 'Halo Commons', status: STATUS.SUCCESS, path: "/Hiro Projects"}
    ]
        .map(value => {
            let enumValues = Object.keys(STATUS);
            value.status = STATUS[enumValues[Math.floor(Math.random() * enumValues.length)]];
            return value
        })
}