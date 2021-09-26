import { TestBed } from '@angular/core/testing';

import { WebStorageUtilService } from './web-storage-util.service';

describe('WebStorageUtilService', () => {
  let service: WebStorageUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebStorageUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
