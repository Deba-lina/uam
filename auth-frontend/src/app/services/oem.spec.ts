import { TestBed } from '@angular/core/testing';

import { Oem } from './oem';

describe('Oem', () => {
  let service: Oem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
