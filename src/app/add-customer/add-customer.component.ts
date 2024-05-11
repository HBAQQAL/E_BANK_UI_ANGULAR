import { Component } from '@angular/core';
import { Customer } from '../models/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent {
  private customer: Customer = {
    id: 0,
    name: '',
    email: '',
  };
  addCustomerForm!: FormGroup;
  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.addCustomerForm = this.fb.group({
      name: '',
      email: '',
    });
  }

  async addCustomer() {
    this.customer.name = this.addCustomerForm.get('name')?.value;
    this.customer.email = this.addCustomerForm.get('email')?.value;
    console.log(this.addCustomerForm.value);
    this.customerService
      .addCustomer(this.customer)
      .pipe()
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
