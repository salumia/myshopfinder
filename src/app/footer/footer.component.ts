import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NewsletterService } from '../services/newsletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  newsletterForm: FormGroup;
  formSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private newsletterService: NewsletterService) {
    this.newsletterForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.newsletterForm.controls; }

  submitForm(): void {
    this.formSubmitted = true;
    if (this.newsletterForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Please Provide a Valid Email ID', detail: '' });
      return;
    }

    let parameters = {
      mail: this.newsletterForm.value.mail
    };
    console.log(parameters);
    
    var formData: any = new FormData();
    formData.append(`mail`, this.newsletterForm.value.mail);
    this.newsletterService.addMailToNewsletter(formData).subscribe(response => {
      if (response.status) {
        this.formSubmitted = false;
        this.messageService.add({ severity: 'success', summary: response.message, detail: '' });
        this.newsletterForm.reset();
      } else {
        this.messageService.add({ severity: 'error', summary: response.message, detail: '' });
      }
    });
  }
}
