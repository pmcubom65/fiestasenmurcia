import { Component, OnInit } from '@angular/core';
import {  ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-videoentrada',
  templateUrl: './videoentrada.component.html',
  styleUrls: ['./videoentrada.component.scss']
})
export class VideoentradaComponent implements OnInit {
  
  
  audioPlayer: HTMLAudioElement;


  @ViewChild('vid', {static: true}) set playerRef(ref: ElementRef<HTMLAudioElement>) {
    this.audioPlayer = ref.nativeElement;
  }

  constructor() {
    
  //  var audioPlayer = <HTMLVideoElement> document.getElementById('vid');


    
   }

  ngOnInit(): void {

   // this.router.navigate(['']);

  }




  ngAfterViewInit() {

    
    setTimeout(function(){
      if (this.audioPlayer) {
        this.audioPlayer.play();
      }
      
  },1000);
  
  }

}
