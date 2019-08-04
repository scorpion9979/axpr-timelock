import Lock from './components/Lock.vue';
import Release from './components/Release.vue';
import Deposit from './components/Deposit.vue';

const routes = [
    {
        path: '/',
        component: Lock,
        name: 'lock',
        alias: '/lock',
        meta: {
            title: 'Lock Page',
            subtitle: 'Here you can lock AXPR to be released for a specified address at a specified time'
        }
    },
    {
        path: '/release',
        component: Release,
        name: 'release',
        meta: {
            title: 'Release Page',
            subtitle: 'Here you can release locked AXPR for an address after the lock period has passed'
        }
    },
    {
        path: '/deposit',
        component: Deposit,
        name: 'deposit',
        meta: {
            title: 'Deposit Page',
            subtitle: 'Here you can deposit AXPR to fund the DApp'
        }
    }
];

export default routes;
