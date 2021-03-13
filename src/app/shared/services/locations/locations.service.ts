import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../constants';
import { Location } from '../../models/location/location';
import { Subject } from 'rxjs';
import { Weather } from '../../models/weather/weather';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private CITY_URL = 'locations/v1/cities/search';
  private DAILY_URL = 'forecasts/v1/daily/5day';

  constructor(private http: HttpClient) { }

  private locations: Location[] = [];
  locs: Subject<Location> = new Subject();

  addLocation(loc: Location) {
    if (!this.locations.find(l => l.Key == loc.Key)) this.locations.push(loc);
    else console.log("Already saved this location");
    loc.Saved = true;
    return loc;
  }

  getLocations(): Location[] {
    return this.locations;
  }

  clearLocations(): Location[] {
    this.locations = [];
    return this.locations;
  }

  removeLocation(loc: Location) {
    this.locations = this.locations.filter(x => x.Key != loc.Key);
    loc.Saved = false;
    return loc;
  }

  isSaved(loc: Location) {
    if (loc == undefined) return false;
    return this.locations.find(x => x.Key == loc.Key) != undefined
  }

  searchCity(city: string){
    return this.http.get<Object[]>(`${Constants.BASE_URL}${this.CITY_URL}?apikey=${Constants.API_KEY}&q=${city}`);
  }

  fakeSearch(city: string){
    return [{LocalizedName: city, Key: `${Math.floor(Math.random()*Math.floor(999999))}`, AdministrativeArea: {LocalizedName: 'US'}}]; //Key is for Logan,UT
  }

  getCityTemp(city: Location){
    return this.http.get<any>(`${Constants.BASE_URL}${this.DAILY_URL}/${city.Key}?apikey=${Constants.API_KEY}`)
  }

  fakeCityTemp(city: Location){
    return [{"DailyForecasts": [
      {
        "Date": "2021-03-12T07:00:00-07:00",
        "Temperature": {
          "Minimum": {
            "Value": 24,
            "Unit": "F"},
          "Maximum": {
            "Value": 44,
            "Unit": "F"}
        }, 
      },
      {
        "Date": "2021-03-13T07:00:00-07:00",
        "Temperature": {
          "Minimum": {
            "Value": 30,
            "Unit": "F"},
          "Maximum": {
            "Value": 40,
            "Unit": "F"}
        }, 
      },
      {
        "Date": "2021-03-14T07:00:00-07:00",
        "Temperature": {
          "Minimum": {
            "Value": 15,
            "Unit": "F"},
          "Maximum": {
            "Value": 100,
            "Unit": "F"}
        }, 
      },
    ]
  }
  ]
  }
}
