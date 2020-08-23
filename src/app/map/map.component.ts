import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import {Input} from '@angular/core'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  inputs: ['center']
})
export class MapComponent implements OnInit {
  @Input() center: any[];
  
 

 
  constructor(private map: MapService) {
  }


  ngOnInit() {
   
    setTimeout(()=>{
  
      this.map.buildMap(this.center);
  }, 1000);
   


}

}
