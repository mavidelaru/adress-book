import { Injectable } from '@angular/core';
import { contact } from './entities';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
  contactsList: contact[] = [];

  constructor() { }

  getItems() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return contacts;
  }

  setItems(data) {
    localStorage.setItem('contacts', JSON.stringify(data));
  }


}
