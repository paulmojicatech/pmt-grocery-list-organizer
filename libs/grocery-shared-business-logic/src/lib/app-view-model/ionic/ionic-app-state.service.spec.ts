import { TestBed } from '@angular/core/testing';

import { IonicAppStateService } from './ionic-app-state.service';

describe('IonicAppStateService', () => {
  let service: IonicAppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonicAppStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
