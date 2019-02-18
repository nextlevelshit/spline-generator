import { TestBed } from '@angular/core/testing';

import { NlsSplineGeneratorService } from './nls-spline-generator.service';

describe('NlsSplineGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NlsSplineGeneratorService = TestBed.get(NlsSplineGeneratorService);
    expect(service).toBeTruthy();
  });
});
