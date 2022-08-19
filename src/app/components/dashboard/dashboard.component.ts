import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Customers } from 'src/app/model/customers';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customersList: Customers[] = [];

  customerObj: Customers = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  }
  //
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  mobile: string = '';

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  //Logout
  register() {
    this.auth.logout();
  }

  getAllCustomers() {
    this.data.getAllCustomers().subscribe(res => {

      this.customersList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching customer data');
    })

  }

  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
  }

  //add customers 
  addCustomer() {
    this.customerObj.id = '';
    this.customerObj.email = this.email;
    this.customerObj.first_name = this.first_name;
    this.customerObj.last_name = this.last_name;
    this.customerObj.mobile = this.mobile;

    this.data.addCustomer(this.customerObj);
    this.resetForm();
  }

  //update Customer
  updateCustomer() {

  }

  //Delete customer
  deleteCustomer(customer: Customers) {
    if (window.confirm('OK?' + customer.first_name + 'OK?' + customer.last_name + '?')) {
      this.data.deleteCustomer(customer);
    }
  }

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phone', 'actions'];

}
