import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazadetalleComponent } from './plazadetalle.component';

describe('PlazadetalleComponent', () => {
  let component: PlazadetalleComponent;
  let fixture: ComponentFixture<PlazadetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlazadetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlazadetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
