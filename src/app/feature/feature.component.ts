import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { FeatureService } from '../services/feature.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {


  data: any = [];
  loading:boolean = true;

  constructor(private _serviceFeature: FeatureService) { }

  ngOnInit(): void {
    this._serviceFeature.getFeatureProduct().subscribe(
      (data) => {
        this.data = data;
         console.log(this.data.product[0]);
        this.loading = false;
      }
    );
  }

}
