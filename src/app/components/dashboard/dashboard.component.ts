import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Customers } from 'src/app/model/customers';
import { DataService } from 'src/app/shared/data.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Customer table
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
  table = 'table'
  darkMode: boolean = false;
  showSpinner: boolean = true;

  constructor(private auth: AuthService, private data: DataService) { }
  ngOnInit(): void {
    this.getAllCustomers();
    this.welcome()

  }
  getAll() {
    this.auth.getUserData();
  }
  welcomeMessage = new Date();
  hiMessage = '';

  welcome() {
    let date = new Date();
    let time = date.getHours();
    if (time < 12) {
      this.hiMessage = 'Good Morning Today Is' + ' ';
    } else if (time < 19) {
      this.hiMessage = 'Good Afternoon Today Is' + ' ';
    } else if (time > 19) {
      this.hiMessage = 'Good Evening Today';
    }
  }

  //Logout
  register() {
    this.auth.logout();
  }

  getAllCustomers() {
    this.data.getAllCustomers().subscribe(res => {
      this.showSpinner = false //Show spinner
      this.customersList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      err.alert('kötü')
      alert('Error while fetching customer data');
      console.log('kötü')
    })
  }

  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
  }
  errorMessage = 'none'

  error() {
    this.errorMessage = 'error'
    setTimeout(() => {
      this.errorMessage = 'none'
    }, 2000);
  }


  //add customers 
  addCustomer() {
    if (this.first_name === "" || this.last_name === "" || this.email === "" || this.mobile === "") {
      this.error()
      //Alert class
      return false
    } else {
      this.errorMessage = 'none'
      this.customerObj.id = '';
      this.customerObj.email = this.email;
      this.customerObj.first_name = this.first_name;
      this.customerObj.last_name = this.last_name;
      this.customerObj.mobile = this.mobile;

      this.data.addCustomer(this.customerObj);
      this.resetForm();
      return true
    }
  }

  //update Customer
  updateCustomer() {

  }

  //Delete customer
  deleteCustomer(customer: Customers) {
    if (window.confirm('Sure delete' + ' ' + customer.first_name + ' ' + customer.last_name + '?')) {
      this.data.deleteCustomer(customer);
    }
  }
  //Hide table function
  hide = ''
  visibility: boolean = false;
  hideTable() {
    if (this.hide === '') {
      this.hide = 'none'
      this.visibility = true;
    } else {
      this.hide = '';
      this.visibility = false;
    }
  }

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phone', 'actions'];

}
