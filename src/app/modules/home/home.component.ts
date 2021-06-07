import { ContactServiceService } from './../../services/contact-service.service';
import { contact } from '../../services/entities';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contactsList: contact[] = [];
  delateModal;
  modalRef: BsModalRef;
  selectedUser;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private contactService: ContactServiceService,
  ) { }

  ngOnInit() {
    this.contactService.getItems().forEach(
      data => {
        this.contactsList.push(data);
      }
    );
  }

  create() {
    this.router.navigateByUrl('/create-contact');
  };

  edit(user) {
    this.router.navigate(['/create-contact'], { state: { user: user } })

  };

  delate(user, template) {
    this.selectedUser = user;
    this.openModal(template);
  };

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(user): void {
    var position = this.contactsList.findIndex(element => element.name == user.name
    );
    this.contactsList.splice(position, 1);
    this.contactService.setItems(this.contactsList);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
