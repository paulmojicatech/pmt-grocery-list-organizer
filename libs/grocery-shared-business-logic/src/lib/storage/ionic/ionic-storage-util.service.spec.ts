import { TestBed } from '@angular/core/testing';

import { IonicStorageUtilService } from './ionic-storage-util.service';

describe('IonicStorageUtilService', () => {
  let service: IonicStorageUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonicStorageUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
