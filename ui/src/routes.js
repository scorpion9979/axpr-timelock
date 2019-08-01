import Lock from './components/Lock.vue';
import Release from './components/Release.vue';

const routes = [
    {
        path: '/',
        component: Lock,
        name: 'lock',
        alias: '/lock',
        meta: {
            title: "Lock Page",
            subtitle: "Here you can lock AXPR for a specified address to be released at a specified time"
        }
    },
    {
        path: '/release',
        component: Release,
        name: 'release',
        meta: {
            title: "Release Page",
            subtitle: "Here you can release locked AXPR for an address after the lock period has passed"
        }
    }
];

export default routes;
