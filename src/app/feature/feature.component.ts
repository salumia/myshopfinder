import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {


  data: any = [];
  loading:boolean = true;

  constructor(private _serviceCategory: CategoryService) { }

  ngOnInit(): void {
    this._serviceCategory.getAllCategories().subscribe(
      (data) => {
        this.data = data;
        // console.log(this.data.product);
        this.loading = false;
      }
    );
  }

}
