import { TestBed } from '@angular/core/testing';

import { WebAppStateService } from './web-app-state.service';

describe('WebAppStateService', () => {
  let service: WebAppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebAppStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
