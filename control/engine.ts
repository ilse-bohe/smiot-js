import {Device} from "./device";
import fs = require('fs');
import jsonminify = require('jsonminify');
import {Driver} from "./driver";

//import {PrologEngine} from "./prologengine";
import {Asset} from "../configuration/asset";

import {DeviceConfiguration} from "../configuration/deviceconfiguration";
import {RestDriver} from "./restdriver";
// import {BLEDriver} from "./bledriver";
import {DriverInfo} from "../configuration/driverinfo";
import {DriverType} from "../configuration/drivertype";
// import {BLEDriver2} from "./bledriver-2";
import {MqttDriver} from "./mqttdriver";


const events = require('events');

export class Engine {

    // properties
    devices: Device[];
    assets: Asset[];
    private drivers: Driver[];
    //prologEngine: PrologEngine;

    /**
     * @constructor
     */
    constructor() {
        this.devices = new Array();
        this.assets = new Array();
        this.drivers = new Array();
        this.addDrivers();
        //this.prologEngine = new PrologEngine(this);

        // @ts-ignore
        // global.eventEmitter = new events.EventEmitter();
    }

    /**
     * Adds known drivers to the driver list
     */
    private addDrivers() {
        this.drivers.push(new RestDriver("v0.0"));
        console.log("restdriver added");
        this.drivers.push(new MqttDriver("v0.0"));
        console.log("mqttdriver added");
        // this.drivers.push(new BLEDriver("v0.0"));
        // console.log("bledriver added");
        // this.drivers.push(new BLEDriver2("v0.0"));
        // console.log("bledriver2 added");
        //TODO fix ble driver error
    }

    toString(){
        return this.drivers.toString();
    }

    setup(assetFilePath: string, deviceFilePath: string) {
        console.log("adding assets & devices")

        //this.prologEngine.setup(assetFilePath);
        // let assetConfigs: AssetConfiguration[] = Object.entries(JSON.parse(fs.readFileSync(assetFilePath).toString())).map(([key, value]) => AssetConfiguration.fromJSON(value));
        // assetConfigs.forEach(config => this.addAsset(config));

        let deviceConfigs: DeviceConfiguration[] = Object.entries(JSON.parse(jsonminify(fs.readFileSync(deviceFilePath).toString()))).map(([key, value]) => DeviceConfiguration.fromJSON(<DeviceConfiguration>value));
        deviceConfigs.forEach(config => this.addDevice(config));
        // this.prologEngine.start();
        //console.log(this.devices.toString());
    }



    /**
     *
     * @param deviceConfig
     */
    addDevice(deviceConfig: DeviceConfiguration) {
        this.devices.push(new Device(deviceConfig, this));
    }

    /**
     *
     * @param deviceId - The unique ID identifying the device
     * @return Device
     */
    getDevice(deviceId: string) {
        const device = this.devices.find(item => item.configurations.deviceId === deviceId);
        if (device != null) {
            return device;
        } else {
            console.log("device " + deviceId + " not found!");
            //TODO throw device not-found exception
        }
    }

    // methods
    getDevices() {
        return this.devices
    }


    performWrite(driverInfo: DriverInfo, value: any) {
        return this.findDriver(driverInfo.driverType, driverInfo.version).performWrite(driverInfo.settings, value);
    }


    performRead(driverInfo: DriverInfo) {
        return this.findDriver(driverInfo.driverType, driverInfo.version).performRead(driverInfo.settings);
    }



    performMonitor(driverInfo: DriverInfo) {
        var temp = {};
        for (const [key, value] of Object.entries(driverInfo.settings)) {
            temp[key] = value;
        }
        return this.findDriver(driverInfo.driverType, driverInfo.version).performMonitor(driverInfo.settings);
    }

    stopPerformMonitor(driverInfo: DriverInfo) {
        return this.findDriver(driverInfo.driverType, driverInfo.version).stopPerformMonitor(driverInfo.settings);
    }

    private findDriver(driverType: DriverType, version: string) {
        const driver = this.drivers.find(item => item.type === driverType && item.version === version);
        if (driver != null) {
            return driver;
        } else {
            console.log("driver " + DriverType[driverType] + " " + version + " not found!");
            //TODO throw driver not found exception
        }
    }

}