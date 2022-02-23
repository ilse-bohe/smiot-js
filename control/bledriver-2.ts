// import {DriverType} from "../configuration/drivertype";
// import {Observable} from "rxjs";
//
// const {createBluetooth} = require('node-ble')
// const {bluetooth, destroy} = createBluetooth()
// import {Driver} from "./driver"
//
// export class BLEDriver2 extends Driver {
//     type: DriverType;
//     version: string;
//     characteristic;
//     subscribed;
//
//     constructor(version: string) {
//         super();
//         this.type = DriverType.BLEDriver2;
//         this.version = version;
//         this.characteristic = null;
//         this.subscribed;
//     }
//
//     performMonitor(settings: Object) {
//
//         bluetooth.defaultAdapter().then(adapter => {
//             adapter.startDiscovery().then(v => {
//                 adapter.waitDevice(settings["mac"]).then(device => {
//                     device.connect().then(device =>{
//                         console.log("device connected");
//                     })
//                 })
//             })
//         })
//         return new Observable(observer => console.log("test"));
//
//     }
//
//     performRead(settings: Object) {
//     }
//
//     performWrite(settings: Object,  value: any) {
//     }
//
//     stopPerformMonitor(settings: Object) {
//     }
// }