import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  getCustomers = (): Observable<Array<Customer>> => {
    return this.http.get<Array<Customer>>(
      'http://localhost:8080/api/customer/customers'
    );
  };
  searchCustomers = (searchTerm: string): Observable<Array<Customer>> => {
    return this.http.get<Array<Customer>>(
      `http://localhost:8080/api/customer/customers/search?keyword=${searchTerm}`
    );
  };
  addCustomer = (customer: Customer): Observable<Customer> => {
    return this.http.post<Customer>(
      'http://localhost:8080/api/customer/customers',
      customer
    );
  };
}
