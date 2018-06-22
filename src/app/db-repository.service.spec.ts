import { TestBed, inject } from '@angular/core/testing';

import { DbRepositoryService } from './db-repository.service';

describe('DbRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbRepositoryService]
    });
  });

  it('should be created', inject([DbRepositoryService], (service: DbRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
