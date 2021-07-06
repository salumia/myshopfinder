import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../services/category.service';
import { FeatureUpdateService } from '../services/feature-update.service';
import { MetaServiceService } from '../services/meta-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any = [];
  loading:boolean = true;
  error_status:boolean = false;
  constructor(private _serviceCategory: CategoryService,private metaService:MetaServiceService,private featureUpdateService:FeatureUpdateService) { 
    this.featureUpdateService.updateStatusText("yes");
  }

  ngOnInit(): void {    
    this.metaService.addTitle(environment.BASE_TITLE);
    this.metaService.addDescription(environment.BASE_DESCRIPTION);
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
