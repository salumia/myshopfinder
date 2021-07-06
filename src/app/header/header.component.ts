import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CommonBreadcrumbDataService } from '../services/common-breadcrumb-data.service';
import { CommonDataService } from '../services/common-data.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchText: string = "";
  search_opened: boolean = false;

  constructor(private location: Location, private route: Router, private commonService: CommonDataService) {

  }

  ngOnInit(): void {
    this.commonService.currentApprovalSearchText.subscribe(msg => {
      this.searchText = msg;
      if (this.searchText.length == 0) {
        this.search_opened = false;
      } else {
        this.search_opened = true;
      }
    });
  }

  searchProduct(): void {
    if (this.searchText.length != 0) {
      this.search_opened = true;
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "q": this.searchText
        }
      };
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate(['/products'], navigationExtras);
    } else {
      this.search_opened = false;
    }
  }

  updateText(): void {
    this.searchText = "";
    this.commonService.updateSearchText(this.searchText);
    this.search_opened = false;
  }

  jumpToProduct(): void {
    this.searchText = "";
    this.commonService.updateSearchText(this.searchText);
    this.search_opened = false;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['/products']);
  }

}
