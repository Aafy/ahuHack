import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFund } from '../models/funds.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderEntryService {
  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllFunds(): Observable<IFund[]> {
    return this.http.get<IFund[]>(`${this.apiUrl}/funds`);
  }

  getAllSecurities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/securities`);
  }
}
