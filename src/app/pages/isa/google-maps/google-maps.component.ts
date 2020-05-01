import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { ClinicService } from 'src/app/services/clinic.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';



@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 20,
    minZoom: 4,
  }
  markers = []
  infoContent = ''
  private data: any;

  constructor(private clinicService: ClinicService, private message: NzMessageService, private router: Router) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.data = JSON.parse(localStorage.getItem('latlon'));
      if(this.data != null){
        this.center = {
          lat: Number(this.data.lat),
          lng: Number(this.data.lon)
        }
      }else{
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }

      
    })
    this.setupClinics();
  }

  setupClinics() {
    this.clinicService.getAllClinics().subscribe(data => {
      for(let i = 0;i < data.length;i++){
         if(data[i].lat != null && data[i].lon != null){
          this.markers.push({
            position: {
              lat: Number(data[i].lat),
              lng: Number(data[i].lon)
            },
            label: {
              color: 'red',
              text: data[i].name,
            },
            title: data[i].name,
            info: data[i].description,
            options: {
              animation: google.maps.Animation.BOUNCE,
            },
          })
        }
      }
    })
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    })
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }
}
