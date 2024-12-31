import {atom, selector} from 'recoil'
import axios from 'axios'

export const networkAtom = atom({
    key: "networkAtom",
    default: selector({
        key: "networkAtomSelector",
        get: async()=>{
            const res = await axios.get("https://sum-server.100xdevs.com/notfication")
            return res.data;
        }
    })
});

