import { TestBed } from '@angular/core/testing';

import { PlanmealsService } from './planmeals.service';

describe('PlanmealsService', () => {
  let service: PlanmealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanmealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
