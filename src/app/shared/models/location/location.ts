import { Weather } from "../weather/weather";

export class Location {
    constructor(loc: Location) {  Object.assign(this,loc) }; 
    City?: string;
    Key?: string;
    Parent?: string;
    Weathers?: Weather[] = [];
    Saved?: boolean = false;
}
