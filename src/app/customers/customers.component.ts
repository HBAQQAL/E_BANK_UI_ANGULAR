import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Customer } from '../models/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  searchByName() {
    const searchTerm = this.searchFromGroup.get('searchTerm')?.value;
    this.customers = this.customerService.searchCustomers(searchTerm).pipe(
      catchError((error) => {
        this.errorMessage = error;
        return throwError(error);
      })
    );
  }
  customers: Observable<Array<Customer>> | undefined;
  errorMessage: String | undefined;
  searchFromGroup!: FormGroup;
  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.searchFromGroup = this.fb.group({
      searchTerm: '',
    });
    this.searchByName();
  }
}
