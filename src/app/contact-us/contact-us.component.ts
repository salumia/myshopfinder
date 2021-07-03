import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SendContactService } from '../services/send-contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  model:any = {};

  constructor(private serviceContact:SendContactService) { }

  server_response:string = "";
  ngOnInit(): void {
  }

  processForm(myForm:NgForm):void{
    var formData: any = new FormData();
    formData.append(`name`, this.model.name);
    formData.append(`email`, this.model.email);
    formData.append(`message`, this.model.message);
    this.serviceContact.sendContactDetails(formData).subscribe(
      (data) => {
        this.server_response = data.message;
        //this.model.name = this.model.email = this.model.message = "";
        myForm.resetForm();
      },
      (error) => {
        this.server_response = error;
      }
    );
  }

}
