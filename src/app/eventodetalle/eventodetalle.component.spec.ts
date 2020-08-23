import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventodetalleComponent } from './eventodetalle.component';

describe('EventodetalleComponent', () => {
  let component: EventodetalleComponent;
  let fixture: ComponentFixture<EventodetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventodetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventodetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
