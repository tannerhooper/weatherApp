import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Weather } from 'src/app/shared/models/weather/weather';
import { Location } from '../../shared/models/location/location';
import { LocationsService } from '../../shared/services/locations/locations.service';

@Component({
  selector: 'location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent implements OnInit {
  constructor(private locService: LocationsService) { }
  ngOnChanges(){
    this.btnText = this.updateText();
    this.displayedWeathers();
  }
  ngOnInit() { }
  @Input() curLoc: Location;
  @Output() updateLoc = new EventEmitter<Location>();
  btnText: string;
  textCnt: number = 1;
  wetCnt: number = 3;
  forcast: Weather[];

  save(){
    this.updateLoc.emit(this.curLoc);
    this.btnText = this.updateText();
  }

  updateText(){
    return this.curLoc.Saved ? "REMOVE" : "SAVE";
  }

  updateForcast(){
    this.textCnt = this.textCnt == 1 ? 3 : 1;
    this.wetCnt = this.textCnt == 1 ? 3 : 1;
    this.displayedWeathers();
  }

  displayedWeathers(){
    this.forcast = this.curLoc.Weathers?.slice(0,this.wetCnt) || [];
  }
}
