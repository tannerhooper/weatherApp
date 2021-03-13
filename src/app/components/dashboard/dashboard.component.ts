import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/shared/services/locations/locations.service';
import { Location } from '../../shared/models/location/location';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private locationService: LocationsService) { }

  ngOnInit(): void {
    this.locationService.locs.subscribe({
      next: (v) => {
        this.updateLocs()
      }
    })
  }

  locations: Location[];

  updateLocs(){
    this.locations = this.locationService.getLocations();
  }

  save(loc: Location){
    loc = loc.Saved ? this.locationService.removeLocation(loc) : this.locationService.addLocation(loc);
    this.locationService.locs.next(loc);
  }
}
