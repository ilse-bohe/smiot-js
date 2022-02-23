import {ParameterInfo} from "./parameterinfo";
import fs = require('fs');


export class DriverReference {
    // properties
    parameters: ParameterInfo[]
    //constructor
    constructor(fileName: string) {
        // @ts-ignore
        this.parameters = Object.entries(JSON.parse(fs.readFileSync("./configuration-files/" + fileName+".json"))).map(([key, value]) => ParameterInfo.fromJSON(value));

    }
    //methods
}