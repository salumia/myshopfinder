import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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


  data: any = [];
  loading: boolean = true;
  view_status: boolean = true;
  already_loaded: boolean = false;
  error_status: boolean = false;

  constructor(private _serviceFeature: FeatureService, private serviceProduct: ProductsService) {
    console.log("Worked");
  }

  ngOnInit(): void {   
    this._serviceFeature.getFeatureProduct().subscribe(
      (data) => {
        this.data = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.error_status = true;
      }
    );
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

}
