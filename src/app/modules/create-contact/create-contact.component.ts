import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ContactServiceService } from 'src/app/services/contact-service.service';
import { contact } from 'src/app/services/entities';


@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
  countryList: string[];
  form: FormGroup;
  contactsList: contact[] = [];
  userToEdit;



  constructor(
    private router: Router,
    private contactService: ContactServiceService,

  ) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit() {

    this.userToEdit = history.state.user;

    this.form = new FormGroup({
      name: new FormControl(this.userToEdit ? this.userToEdit.name : '', Validators.required),
      surname: new FormControl(this.userToEdit ? this.userToEdit.surname : '', Validators.required),
      email: new FormControl(this.userToEdit ? this.userToEdit.email : '', [
        Validators.required,
      ]),
      country: new FormControl(this.userToEdit ? this.userToEdit.country : '', Validators.required),
      details: new FormControl(this.userToEdit ? this.userToEdit.details : ''),
    });
    this.countryList = require('country-list').getNames();

    this.validate();

    this.contactService.getItems().forEach(
      data => {
        this.contactsList.push(data);
      });

  }

  back() {
    this.router.navigateByUrl('/home');
  };

  onSubmit() {
    if (this.form.valid){

      if (this.userToEdit) {
        var position = this.contactsList.findIndex(element => element.name === this.userToEdit.name
        );
        this.contactsList.splice(position, 1, this.form.value);
        this.contactService.setItems(this.contactsList);


      } else {
        this.contactsList.push(this.form.value);
        this.contactService.setItems(this.contactsList);
      }
      this.router.navigateByUrl('/home');
    }

  };

  private validate() {
    document.getElementById("name").addEventListener("blur", this.validateName);
    document.getElementById("surname").addEventListener("blur", this.validateSurname);
    document.getElementById("email").addEventListener("blur", this.validateEmail);
  };

  private validateName() {
    var nameInput = (<HTMLInputElement>document.getElementById("name")).value;

    if (nameInput.length < 3) {
      document.getElementById("name1").innerHTML = "name must has atleast 3 charecters";
      document.getElementById("name2").innerHTML = ""
      return false;
    } else {
      document.getElementById("name1").innerHTML = "";
      document.getElementById("name2").innerHTML = "correct";
      return true;
    }
  }

  private validateSurname() {
    var nameInput = (<HTMLInputElement>document.getElementById("surname")).value;

    if (nameInput.length < 5) {
      document.getElementById("surname1").innerHTML = "name must has atleast 5 charecters";
      document.getElementById("surname2").innerHTML = ""
      return false;
    } else {
      document.getElementById("surname1").innerHTML = "";
      document.getElementById("surname2").innerHTML = "correct";
      return true;
    }
  }

  private validateEmail() {
    var emailInput = (<HTMLInputElement>document.getElementById("email")).value;
    let validator = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (emailInput.length == 0 || !(validator.test(emailInput))) {
      document.getElementById("email1").innerHTML = "email not valid";
      document.getElementById("email2").innerHTML = "";
      return false;
    } else {
      document.getElementById("email1").innerHTML = "";
      document.getElementById("email2").innerHTML = "correct";
      return true;
    }
  }


}
