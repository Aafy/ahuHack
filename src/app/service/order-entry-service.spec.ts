import { TestBed } from '@angular/core/testing';

import { OrderEntryService } from './order-entry-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrderEntryServiceService', () => {
  let service: OrderEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(OrderEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAllFunds', () => {
    const funds$ = service.getAllFunds();
    funds$.subscribe((val) => {
      expect(val).toBeUndefined();
    });
  });
});
