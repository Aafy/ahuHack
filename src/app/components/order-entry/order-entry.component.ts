import { Component } from '@angular/core';
import { OrderEntryService } from '../../service/order-entry-service';
import { IFund, IFunds } from '../../models/funds.model';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-order-entry',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-entry.component.html',
  styleUrl: './order-entry.component.scss',
})
export class OrderEntryComponent {
  orderValue = 10000;
  constructor(private orderEntryService: OrderEntryService) {}
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
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
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

  ngOnInit() {}

  save() {}
}
