import { TestBed } from '@angular/core/testing';

import { AnimatecarritoService } from './animatecarrito.service';

describe('AnimatecarritoService', () => {
  let service: AnimatecarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimatecarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
