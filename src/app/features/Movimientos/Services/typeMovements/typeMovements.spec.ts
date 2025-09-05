import { TestBed } from '@angular/core/testing';

import { TypeMovementsService } from './typeMovements';

describe('TypeMovementsService', () => {
  let service: TypeMovementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMovementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
