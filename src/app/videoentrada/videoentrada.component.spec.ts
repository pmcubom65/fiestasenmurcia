import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoentradaComponent } from './videoentrada.component';

describe('VideoentradaComponent', () => {
  let component: VideoentradaComponent;
  let fixture: ComponentFixture<VideoentradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoentradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoentradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
