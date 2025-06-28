import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFunds } from '../models/funds.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderEntryService {
  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllFunds(): Observable<IFunds> {
    return this.http.get<IFunds>(`${this.apiUrl}/funds`);
  }
}
