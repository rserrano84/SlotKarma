import { TestBed } from '@angular/core/testing';

import { CommonLibraryService } from './common-library.service';

describe('CommonLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonLibraryService = TestBed.get(CommonLibraryService);
    expect(service).toBeTruthy();
  });
});
