import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, EventEmitter, Output } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatDialog } from '@angular/material';

import { ErrorComponent } from 'src/app/error/error.component';
import { BusinessLocation } from '../../auth/auth.model';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  // recieved location
  @Input() recievedLocation: BusinessLocation  = {
    lat: 0,
    lang: 0,
    homeTown : ''
  }

  // set location mode
  @Input() setLocation = false;

  @Input() searchMode = false;

  // exporting business location data
  @Output() buusinessLocationEmit = new EventEmitter<BusinessLocation>();

  // initial map zoom
  zoom: number;

  // initial map address
  address: string;

  // recieved locations
  @Input() recievedLocations: any[] = [];

  // agm label color
  color = '#223456';


  private geoCoder;

  constructor( private mapsAPILoader: MapsAPILoader,
               private ngZone: NgZone,
               public dialog: MatDialog) { }

  ngOnInit() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.recievedLocation.lat = place.geometry.location.lat();
          this.recievedLocation.lang = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

  }

 // set current location
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.recievedLocation.lat = position.coords.latitude;
        this.recievedLocation.lang = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.recievedLocation.lat, this.recievedLocation.lang);
      });
    }
    console.log(this.recievedLocations);
  }

  // marker dragging is completed
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.recievedLocation.lat = $event.coords.lat;
    this.recievedLocation.lang = $event.coords.lng;
    this.getAddress(this.recievedLocation.lat, this.recievedLocation.lang);
  }

  // get the ddress of dragged marker
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.recievedLocation.homeTown = this.address.split(',')[1];
        } else {
          this.dialog.open(ErrorComponent, {data: {message: 'No Results Found! Please change marker..'}});
        }
      } else {
        this.dialog.open(ErrorComponent, {data: {message: 'Geocoder failed due to: ' + status}});
      }

    });
  }

   // send modal data back to parent component
   updateLocation() {
    this.buusinessLocationEmit.emit(this.recievedLocation);
    console.log(this.recievedLocation);
  }

}
