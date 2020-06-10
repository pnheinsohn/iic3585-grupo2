import { TestBed } from '@angular/core/testing';

import { ExplorerService } from './dashboard.service';

describe('DashboardService', () => {
  let service: ExplorerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExplorerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
