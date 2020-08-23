import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  // Coordenadas de la localización donde queremos centrar el mapa
  lat = 43.1746;
  lng = -2.4125;
  zoom = 15;
  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
  }
  buildMap(data) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [data[1], data[0]]
    
    });

   

    var marker = new mapboxgl.Marker()
        .setLngLat([data[1], data[0]]).setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h2 style="color:red; font-weight: bold;">' + data[2] + '</h2><h3 style="font-weight: bold;">' + 'Direccion '+data[3] + '</h3>'))
        .addTo(this.map);
    this.map.addControl(new mapboxgl.NavigationControl());

  


   


 

    }


    
}
