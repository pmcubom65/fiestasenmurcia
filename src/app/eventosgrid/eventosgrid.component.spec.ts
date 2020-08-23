import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosgridComponent } from './eventosgrid.component';

describe('EventosgridComponent', () => {
  let component: EventosgridComponent;
  let fixture: ComponentFixture<EventosgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
