import {Engine} from "./control/engine";

var engine = new Engine();

engine.setup('./configuration-files/assets.json', './configuration-files/devices.json');

//console.log("engine "+engine.toString());
//console.log(engine.getDevices());

var lamp = engine.getDevice("lamp_1");
var lightsensor = engine.getDevice("lightsensor_1");
// var temp_sensor = engine.getDevice("temp_hum_1");

var counter = 0;
//console.log(lamp);
// lamp.getParameter("lightstatus").then(value => console.log("lamp status is " + value)).catch(e => console.log(e));

lamp.monitorParameter("lightstatus", value => {
    console.log("lamp status is " + value)
    counter+=1; console.log(counter)
     if(counter==5) lamp.stopMonitorParameter("lightstatus")
});

lightsensor.getParameter("state").then(value => {
    console.log("lightsensor value is "+value)
})
//
// var counter2 = 0;
//
// lightsensor.monitorParameter("state", value => {
//     console.log("lightsensor value is " + value)
//     counter2+=1; console.log(counter2)
//     if(counter2==5) {
//         lightsensor.stopMonitorParameter("state")
//     }
// })

// var lampsubscriber = lamp.monitorParameter("lightstatus").subscribe(value => {
//     console.log("lamp status is " + value)
//     counter+=1; console.log(counter)
//     if(counter==10) lampsubscriber.unsubscribe()
// }, e => console.log(e));
//lamp.setParameter('lightstatus', false).then( value => console.log("lightstatus set to "+value)).catch( reason => console.log("PERFORMWTRITE FAILED "+reason));
//  // lamp.setParameter('brightness', 10).then( value => console.log("brightness set to "+value)).catch( reason => console.log("PERFORMWTRITE FAILED "+reason));
// lamp.getParameter("lightstatus").then(value => console.log("lamp status is " + value));
//

// temp_sensor.monitorParameter('temperature').subscribe(value => console.log("temperature is "+value) , error => console.log("monitorParameter FAILED "+error) );
