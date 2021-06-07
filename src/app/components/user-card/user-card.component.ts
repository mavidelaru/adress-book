import { contact } from '../../services/entities';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cmp-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() contact: contact;
  @Output() editUser = new EventEmitter<string>();
  @Output() delateUser = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {


  };

  delate(contact) {
    this.delateUser.emit(contact);
  }

  edit(contact) {
    this.editUser.emit(contact);
  }
}
