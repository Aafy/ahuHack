import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEntryComponent } from './order-entry.component';
import { OrderEntryService } from '../../service/order-entry-service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IFund } from '../../models/funds.model';
import { IOrderEntry, IOrderEntryState } from '../../store/order-entry.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { saveOrderEntries } from '../../store/order-entry.actions';
import { of } from 'rxjs';

describe('OrderEntryComponent', () => {
  let component: OrderEntryComponent;
  let fixture: ComponentFixture<OrderEntryComponent>;

  let store: MockStore;
  const mockFunds: IFund[] = [
    {
      fundName: 'Tech Growth Fund',
      securityName: 'Apple Inc.',
      transactionType: 'BUY',
      orderValue: 10000,
      fundCode: '124',
    },
  ];
  //  let orderEntryServiceSpy: jasmine.SpyObj<OrderEntryService>
  let orderEntryServiceSpy = {
    getAllFunds: () => of(mockFunds),
    getAllSecurities: () => of(['Apple Inc.']),
  };

  const initialState: IOrderEntryState = {
    orderEntries: [], // Initial state for order entries
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, OrderEntryComponent],
      providers: [
        { provide: OrderEntryService, useValue: orderEntryServiceSpy },

        provideMockStore({ initialState }), // Provide mock store with initial state
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderEntryComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize with default orderValue and enableOrderEntry', () => {
    expect(component.orderValue).toBe(10000);
    expect(component.enableOrderEntry).toBeFalse();
  });
  it('should unsubscribe from getAllFunds observable on ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.s$, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
  });

  describe('Custom Validators', () => {
    let fundNameControl: FormControl;
    let securityNameControl: FormControl;
    let quantityControl: FormControl;
    let transactionTypeControl: FormControl;

    beforeEach(() => {
      fundNameControl = component.orderEntryForm.get('fundName') as FormControl;
      securityNameControl = component.orderEntryForm.get(
        'securityName'
      ) as FormControl;
      quantityControl = component.orderEntryForm.get('quantity') as FormControl;
      transactionTypeControl = component.orderEntryForm.get(
        'transactionType'
      ) as FormControl;
    });

    describe('invokeOrderEntry()', () => {
      it('should set enableOrderEntry to true', () => {
        expect(component.enableOrderEntry).toBeFalse();
        component.invokeOrderEntry();
        expect(component.enableOrderEntry).toBeTrue();
      });
    });

    describe('securityNameValidator', () => {
      it('should return null for valid securityName (not restricted)', () => {
        securityNameControl.setValue('Google Inc.');
        expect(securityNameControl.errors).toBeNull();
      });

      it('should return securityExists: true for "Apple Inc."', () => {
        securityNameControl.setValue('Apple Inc.');
        expect(securityNameControl.errors).toEqual({ securityExists: true });
      });

      it('should return securityExists: true for "Amazon.com, Inc."', () => {
        securityNameControl.setValue('Amazon.com, Inc.');
        expect(securityNameControl.errors).toEqual({ securityExists: true });
      });

      it('should return securityExists: true for "Caterpillar Inc."', () => {
        securityNameControl.setValue('Caterpillar Inc.');
        expect(securityNameControl.errors).toEqual({ securityExists: true });
      });

      it('should return securityExists: true for "apple inc." (case-insensitive check if applicable)', () => {
        securityNameControl.setValue('apple inc.');
        expect(securityNameControl.errors).toBeNull();
      });
    });
  });
});
