import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocationsService } from '../../shared/services/locations/locations.service';
import { Location } from '../../shared/models/location/location';
import { Weather } from 'src/app/shared/models/weather/weather';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected: Location;
  searchForm = this.formBuilder.group({ city: '' });
  results: Location[];
  multiple: boolean = false;
  btnText: string;
  noRes: boolean = false;
  
  constructor(
    private locationService: LocationsService,
    private formBuilder: FormBuilder)
    { }

  ngOnInit(): void {
    this.locationService.locs.subscribe({
      next: (v) => { }
    })
  }

  onSearch(): void {
    this.results = [];
    this.selected = {};
    this.locationService.searchCity(this.searchForm.value.city)
        .subscribe(res => {
            if (res.length == 0) this.noRes = true;
            else {
              this.noRes = false;
              res.map((r:any) => this.results.push(new Location({City: r.LocalizedName, Key: r.Key, Parent: r.AdministrativeArea.LocalizedName})))
              if (this.results.length == 1) {
                this.multiple = false;
                this.getWeather(this.results[0]);
              }
              else this.multiple = true;
            }
          }
        );
    // api used all daily calls
    // this.locationService.fakeSearch(this.searchForm.value.city)
    //     .map((r: any) => {
    //       if (r.length == 0) this.noRes = true;
    //       else {
    //         this.noRes = false;
    //         this.results.push(new Location({City: r.LocalizedName, Key: r.Key, Parent: r.AdministrativeArea.LocalizedName}))
    //         if (this.results.length == 1) {
    //           this.multiple = false;
    //           this.getWeather(this.results[0]);
    //         }
    //         else this.multiple = true;
    //       }
    //     })
    this.searchForm.reset();
  }

  cityChosen(loc: Location){
    this.results = [];
    this.multiple = false;
    this.getWeather(loc);
  }

  getWeather(loc: Location){
    this.locationService.getCityTemp(loc).subscribe(r => {
        r.DailyForecasts.map((df:any) => {
          loc.Weathers?.push(new Weather ({MinTemp: df.Temperature.Minimum.Value, MaxTemp: df.Temperature.Maximum.Value, Date: new Date(df.Date).toDateString()}))
        })
        this.selected = loc;
      })
    // this.locationService.fakeCityTemp(loc)
    //     .map((r:any) => {
    //       r.DailyForecasts.map((df:any) => {
    //         loc.Weathers?.push(new Weather ({MinTemp: df.Temperature.Minimum.Value, MaxTemp: df.Temperature.Maximum.Value, Date: new Date(df.Date).toDateString()}))
    //       })
    //         this.selected = loc;
    //   })
  }

  save(loc: Location){
    loc = loc.Saved ? this.locationService.removeLocation(loc) : this.locationService.addLocation(loc);
    this.locationService.locs.next(loc)
  }
}
