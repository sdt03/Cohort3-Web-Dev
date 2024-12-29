import { atom, selector } from 'recoil';

export const networkAtom = atom({
    key:'networkAtom',
    default: '0'
})

export const jobsAtom = atom({
    key:'jobsAtom',
    default: '0'
})

export const notificationCountAtom = atom({
    key:'notificationCountAtom',
    default: '10'
})

export const messageAtom = atom({
    key:'messageAtom',
    default: '0'
})

export const notificationCountSelector = selector({
    key: 'notificationCountSelector',
    get: ({get}) => {
        const networkCount = get(networkAtom);
        const messageCount = get(messageAtom);
        const notificationCount = get(notificationCountAtom);
        const jobsCount = get(jobsAtom);
        return networkCount + messageCount + notificationCount + jobsCount;
    }
})