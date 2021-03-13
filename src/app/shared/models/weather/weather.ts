export class Weather {
    constructor(wet: Weather){ Object.assign(this, wet); }
    MinTemp: number;
    MaxTemp: number;
    Date: string;
}
