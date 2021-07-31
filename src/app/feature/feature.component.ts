import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { FeatureUpdateService } from '../services/feature-update.service';
import { FeatureService } from '../services/feature.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {

  searchForm: FormGroup;
  searchtext: string = "";

  constructor(private _serviceFeature: FeatureService, private serviceProduct: ProductsService, private formBuilder: FormBuilder,
    private router: Router) {
    console.log("Worked");
    this.searchForm = this.formBuilder.group({
      searchtext: ['', []]
    });
  }

  ngOnInit(): void {

  }

  generateRequest(product: any): void {
    console.log(product);
    var formData: any = new FormData();
    formData.append(`id`, product.id);
    this.serviceProduct.updateCounterRequest(formData).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchProduct():void{
    this.searchtext = this.searchForm.value.searchtext;
    if (this.searchtext != "") {
      this.router.navigate(['/products'], { queryParams: { s: this.searchtext } });  
    }
  }

}
