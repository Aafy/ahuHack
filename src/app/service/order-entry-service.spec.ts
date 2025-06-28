import { TestBed } from '@angular/core/testing';

import { OrderEntryServiceService } from './order-entry-service';

describe('OrderEntryServiceService', () => {
  let service: OrderEntryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderEntryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
