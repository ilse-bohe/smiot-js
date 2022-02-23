// import {DriverType} from "../configuration/drivertype";
// import {Observable} from "rxjs";
//
// var noble = require('noble-uwp');
// import {Driver} from "./driver"
//
//
// export class BLEDriver extends Driver{
//     type: DriverType;
//     version: string;
//     characteristic;
//     subscribed;
//
//     constructor(version: string) {
//         super();
//         this.type = DriverType.BLEDriver;
//         this.version = version;
//         this.characteristic=null;
//         this.subscribed;
//     }
//
//     // toString() {
//     //
//     //     return "BLEDriver-"+this.version;
//     // }
//
//     performWrite(settings: Object,  value: any) {
//         //TODO implement BLEDriver performWrite
//     }
//
//     performRead(settings: Object) {
//         //TODO implement BLEDriver performRead
//     }
//
//     performMonitor(settings: Object) {
//         var thisDriver = this;
//         if(this.characteristic==null){
//             return new Observable(observer => {
//                 noble.on('stateChange', function (state) {
//                     if (state === 'poweredOn') {
//                         noble.startScanning();
//                     }
//                     else {
//                         noble.stopScanning();
//                     }
//                 });
//                 noble.on('discover', function (peripheral) {
//                     var mac = peripheral.address;
//                     if (mac.localeCompare(settings["mac"].toLowerCase()) == 0) {
//                         noble.stopScanning();
//                         peripheral.connect(function (error) {
//                             if (error) {
//                                 console.log("error occurred:", error.message);
//                             }
//                             peripheral.discoverServices([settings["serviceUUID"]], function (error, services) {
//                                 if (error) {
//                                     console.log("error occurred:", error.message);
//                                 }
//                                 var service = services[0];
//                                 service.discoverCharacteristics([settings["characteristicUUID"]], function (error, characteristics) {
//                                     if (error) {
//                                         console.log("error occurred:", error.message);
//                                     }
//                                     thisDriver.characteristic = characteristics[0];
//                                     thisDriver.characteristic.on('data', function (data, isNotification) {
//                                         try {
//                                             observer.next(data[1]);
//                                         }
//                                         catch (err) {
//                                             observer.error(err);
//                                         }
//                                     });
//                                     thisDriver.characteristic.subscribe();
//                                 });
//                             });
//                         });
//                     }
//                 });
//             });
//         }
//         else {
//             return new Observable( observer => {
//                 thisDriver.characteristic.on('data', function (data, isNotification) {
//                     try {
//                         observer.next(data[1]);
//                     }
//                     catch (err) {
//                         observer.error(err);
//                     }
//                 });
//                 this.characteristic.subscribe();
//             });
//         }
//     }
//
//     stopPerformMonitor(settings: Map<string, string>) {
//         this.characteristic.unsubscribe();
//     }
//
//     private interpreteResponse(response: string, interpreter: any) {
//         //TODO implement BLEDriver interpreteResponse (Do this in Driver?)
//     }
// }