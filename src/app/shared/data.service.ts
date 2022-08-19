import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AngularFireStorage } from '@angular/fire/compat/storage'

import { Customers } from '../model/customers';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private cs: AngularFirestore,private fireStorage:AngularFireStorage) { }

  //add customer 
  addCustomer(customer: Customers) {
    customer.id = this.cs.createId();
    return this.cs.collection('/Customers').add(customer);

  }
  //Get all customers
  getAllCustomers() {
    return this.cs.collection('/Customers').snapshotChanges();
  }

  //delete customers
  deleteCustomer(customer: Customers) {
    return this.cs.doc('/Customers/' + customer.id).delete();
  }
  //Update customer
  updateCustomer(customer: Customers) {
    this.deleteCustomer(customer);
    this.addCustomer(customer);
  }


}
