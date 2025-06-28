import { Component, OnInit } from '@angular/core';
import { OrderEntryService } from '../../service/order-entry-service';
import { IFund, IFunds } from '../../models/funds.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { saveOrderEntries } from '../../store/order-entry.actions';
import { IOrderEntry } from '../../store/order-entry.model';
import { selectOrderEntries } from '../../store/order-entry.selector';

@Component({
  selector: 'app-order-entry',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-entry.component.html',
  styleUrl: './order-entry.component.scss',
})
export class OrderEntryComponent implements OnInit {
  orderValue = 10000;
  orderEntries$: Observable<IOrderEntry[]>;
  fund$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  funds: IFund[] = [];
  s$ = Subscription.EMPTY;
  enableOrderEntry: boolean = false;
  constructor(
    private orderEntryService: OrderEntryService,
    private store: Store
  ) {
    this.orderEntries$ = this.store.pipe(select(selectOrderEntries));
  }
  orderEntryForm = new FormGroup({
    fundName: new FormControl('', [
      Validators.required,
      this.fundNameValidator,
    ]),
    securityName: new FormControl('', [
      Validators.required,
      this.securityNameValidator,
    ]),
    transactionType: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  securityNameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (
      ['Apple Inc.', 'Amazon.com, Inc.', 'Caterpillar Inc.'].includes(value)
    ) {
      return { securityExists: true };
    }
    return null;
  }

  fundNameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (/\d/.test(value)) {
      return { fundNameInvalid: true };
    }
    return null;
  }

  ngOnInit() {
    this.s$ = this.orderEntryService
      .getAllFunds()

      .subscribe((funds) => {
        this.funds = funds;
      });
  }

  save() {
    const orderEntry: IOrderEntry = {
      fundName: this.orderEntryForm.value.fundName,
      securityName: this.orderEntryForm.value.securityName,
      transactionType: this.orderEntryForm.value.transactionType,
      quantity: this.orderEntryForm.value.quantity,
      orderValue: this.orderValue * this.orderEntryForm.value.quantity,
    };

    this.store.dispatch(
      saveOrderEntries({
        orderEntry: orderEntry,
      })
    );
  }

  invokeOrderEntry() {
    this.enableOrderEntry = true;
  }
  ngOnDestroy() {
    this.s$.unsubscribe();
  }
}
