import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoiconoComponent } from './carritoicono.component';

describe('CarritoiconoComponent', () => {
  let component: CarritoiconoComponent;
  let fixture: ComponentFixture<CarritoiconoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarritoiconoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoiconoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
