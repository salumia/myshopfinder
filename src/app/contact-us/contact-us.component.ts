import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MetaServiceService } from '../services/meta-service.service';
import { SendContactService } from '../services/send-contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  model:any = {name:"",email:"",message:""};
  emailValidation: boolean = true;
  server_response:string = "";

  constructor(private serviceContact:SendContactService,private metaService:MetaServiceService) { }

  
  ngOnInit(): void {
    this.metaService.addTitle("Contact Us | " + environment.BASE_TITLE);
    this.metaService.addDescription(environment.BASE_DESCRIPTION);
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
