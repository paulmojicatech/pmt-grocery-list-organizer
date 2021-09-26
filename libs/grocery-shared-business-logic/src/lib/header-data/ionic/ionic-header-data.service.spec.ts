import { TestBed } from '@angular/core/testing';

import { IonicHeaderDataService } from './ionic-header-data.service';

describe('IonicHeaderDataService', () => {
  let service: IonicHeaderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonicHeaderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
