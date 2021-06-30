import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { CommonBreadcrumbDataService } from '../services/common-breadcrumb-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any = [];
  loading:boolean = true;
  error_status:boolean = false;
  constructor(private _serviceCategory: CategoryService) { }

  ngOnInit(): void {    
    this._serviceCategory.getAllCategories().subscribe(
      (data) => {
        this.data = data;
        // console.log(this.data.categories);
        // console.log("Category Service")  ;
        this.loading = false;
      },
      (error) => {
        // console.log(error);
        this.loading = false;
        this.error_status = true;
      }
    );
  }

 

}
