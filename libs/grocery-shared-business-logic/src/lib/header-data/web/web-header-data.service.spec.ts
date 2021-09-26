import { TestBed } from '@angular/core/testing';

import { WebHeaderDataService } from './web-header-data.service';

describe('WebHeaderDataService', () => {
  let service: WebHeaderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebHeaderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
