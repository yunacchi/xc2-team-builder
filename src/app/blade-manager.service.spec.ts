import { TestBed, inject } from '@angular/core/testing';

import { BladeManagerService } from './blade-manager.service';

describe('BladeManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BladeManagerService]
    });
  });

  it('should be created', inject([BladeManagerService], (service: BladeManagerService) => {
    expect(service).toBeTruthy();
  }));
});
