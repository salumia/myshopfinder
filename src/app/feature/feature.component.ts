import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { FeatureService } from '../services/feature.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {


  data: any = [];
  loading:boolean = true;
  view_status:boolean = true;
  already_loaded:boolean = false;
  error_status:boolean = false;

  constructor(private _serviceFeature: FeatureService,private location:Location,private router:Router,private serviceProduct:ProductsService) {
    router.events.subscribe(val => {
      if (location.path() != "" && location.path().indexOf("/home") == -1) {
        this.view_status = false;
      } else{
        this.view_status = true;
      }
    });
   }

  ngOnInit(): void {
    this._serviceFeature.getFeatureProduct().subscribe(
        (data) => {
          this.data = data;
          // console.log("Feature Service");
          this.loading = false;
          //this.already_loaded = true;
        },
        (error) => {
          // console.log(error);
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
